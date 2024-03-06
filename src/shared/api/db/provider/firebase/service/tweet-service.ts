import {
    TCredentialLikeTweet,
    TCredentialTweet,
    TSuccessResponse,
    TUserCredentialID,
    TUserTweetResponseItem,
    firestoreDB,
    openNotification
} from '@/shared'
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from 'firebase/firestore'

export const tweet = {
    postTweet: async function ({
        author,
        tweetedPost,
        tweetMessage,
        hashtags = []
    }: TCredentialTweet): Promise<TSuccessResponse> {
        try {
            const timestamp = new Date().toISOString()
            await addDoc(collection(firestoreDB, 'tweets'), {
                author,
                tweetedPost,
                tweetMessage,
                hashtags,
                timestamp,
                comments: [],
                reaction: {
                    likes: {
                        count: 0,
                        users: []
                    },
                    dislikes: {
                        count: 0,
                        users: []
                    }
                }
            })

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getTweets: async (): Promise<
        Array<Omit<TUserTweetResponseItem, 'comments' | 'reaction'>>
    > => {
        try {
            const collectionRef = collection(firestoreDB, 'tweets')
            const tweetsDoc = (await getDocs(collectionRef)).docs
            const tweets = tweetsDoc.map(doc => {
                const data = doc.data()
                return {
                    id: doc.id,
                    author: data.author,
                    tweetedPost: data.tweetedPost,
                    tweetMessage: data.tweetMessage,
                    hashtags: data.hashtags,
                    timestamp: data.timestamp
                }
            })

            return tweets || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getLikeTweet: async ({
        userID,
        tweetID
    }: TCredentialLikeTweet): Promise<TSuccessResponse> => {
        try {
            const tweetRef = doc(firestoreDB, 'tweets', tweetID)
            const tweetDoc = await getDoc(tweetRef)

            if (!tweetDoc.exists()) {
                openNotification.error({
                    description: 'The like did not happen'
                })
                return
            }

            const reaction = (await getDoc(tweetRef)).data().reaction
            const isAlreadyLiked = reaction.likes.users.includes(userID)

            if (isAlreadyLiked) {
                const count = (reaction.likes.count -= 1)
                const users = reaction.likes.users.filter(
                    (id: TUserCredentialID) => id !== userID
                )
                const updatedLikes = {
                    ...reaction,
                    likes: {
                        count,
                        users
                    }
                }

                await updateDoc(tweetRef, {
                    reaction: updatedLikes
                })
            } else {
                const count = (reaction.likes.count += 1)
                const users = [...reaction.likes.users, userID]
                const updatedLikes = {
                    ...reaction,
                    likes: {
                        count,
                        users
                    }
                }

                await updateDoc(tweetRef, {
                    reaction: updatedLikes
                })
            }

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getDislikeTweet: async ({
        userID,
        tweetID
    }: TCredentialLikeTweet): Promise<TSuccessResponse> => {
        try {
            const tweetRef = doc(firestoreDB, 'tweets', tweetID)
            const tweetDoc = await getDoc(tweetRef)

            if (!tweetDoc.exists()) {
                openNotification.error({
                    description: 'The like did not happen'
                })
                return
            }

            const reaction = (await getDoc(tweetRef)).data().reaction
            const isAlreadyDisliked = reaction.dislikes.users.includes(userID)

            if (isAlreadyDisliked) {
                const count = (reaction.dislikes.count -= 1 || 0)
                const users = reaction.dislikes.users.filter(
                    (id: TUserCredentialID) => id !== userID
                )
                const updatedDislikes = {
                    ...reaction,
                    dislikes: {
                        count,
                        users
                    }
                }

                await updateDoc(tweetRef, {
                    reaction: updatedDislikes
                })
            } else {
                const count = (reaction.dislikes.count += 1)
                const users = [...reaction.dislikes.users, userID]
                const updatedDislikes = {
                    ...reaction,
                    dislikes: {
                        count,
                        users
                    }
                }

                await updateDoc(tweetRef, {
                    reaction: updatedDislikes
                })
            }

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getReaction: async (): Promise<
        Array<Pick<TUserTweetResponseItem, 'comments' | 'reaction' | 'id'>>
    > => {
        try {
            const collectionRef = collection(firestoreDB, 'tweets')
            const tweetsDoc = (await getDocs(collectionRef)).docs
            const reaction = tweetsDoc.map(doc => {
                const data = doc.data()
                return {
                    id: doc.id,
                    reaction: data.reaction
                }
            })

            return reaction || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    }
}
