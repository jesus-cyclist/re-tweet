import {
    TCredentialLikeTweet,
    TCredentialTweet,
    TSuccessResponse,
    TUserCredentialID,
    TUserTweetResponseItem,
    openNotification
} from '@/shared'
import uniqid from 'uniqid'

export const tweet = {
    postTweet: async function ({
        author,
        tweetedPost,
        tweetMessage,
        hashtags = []
    }: TCredentialTweet): Promise<TSuccessResponse> {
        try {
            const tweets: Array<TUserTweetResponseItem> = JSON.parse(
                localStorage.getItem('tweets')
            )

            if (!tweets) {
                localStorage.setItem('tweets', JSON.stringify([]))
            }

            const id = uniqid()
            const timestamp = new Date().toISOString()
            const newTweet: TUserTweetResponseItem = {
                id,
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
            }

            const updatedTweets = [...tweets, newTweet]

            localStorage.setItem('tweets', JSON.stringify(updatedTweets))

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getTweets: async (): Promise<
        Array<Omit<TUserTweetResponseItem, 'comments' | 'reaction'>>
    > => {
        try {
            const tweets: Array<TUserTweetResponseItem> = JSON.parse(
                localStorage.getItem('tweets')
            )

            if (!tweets) {
                localStorage.setItem('tweets', JSON.stringify([]))
            }

            const returnedTweets = tweets.map(t => ({
                id: t.id,
                author: t.author,
                tweetedPost: t.tweetedPost,
                tweetMessage: t.tweetMessage,
                hashtags: t.hashtags,
                timestamp: t.timestamp
            }))

            return returnedTweets || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getLikeTweet: async ({
        userID,
        tweetID
    }: TCredentialLikeTweet): Promise<TSuccessResponse> => {
        try {
            const tweets: Array<TUserTweetResponseItem> = JSON.parse(
                localStorage.getItem('tweets')
            )
            const tweetIndex = tweets.findIndex(tweet => tweet.id === tweetID)

            if (tweetIndex === -1) {
                throw new Error(`Tweet with ID ${tweetID} not found`)
            }

            const tweet = tweets[tweetIndex]
            const reaction = tweet.reaction

            const isAlreadyLiked = reaction.likes.users.some(
                item => item === userID
            )

            let updatedReaction
            if (isAlreadyLiked) {
                const count = (reaction.likes.count -= 1 || 0)
                const users = reaction.likes.users.filter(
                    (id: TUserCredentialID) => id !== userID
                )

                updatedReaction = {
                    ...reaction,
                    likes: {
                        count,
                        users
                    }
                }
            } else {
                const count = (reaction.likes.count += 1)
                const users = [...reaction.likes.users, userID]

                updatedReaction = {
                    ...reaction,
                    likes: {
                        count,
                        users
                    }
                }
            }

            const updatedTweets = [...tweets]
            updatedTweets[tweetIndex].reaction = updatedReaction

            localStorage.setItem('tweets', JSON.stringify(updatedTweets))

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
            const tweets: Array<TUserTweetResponseItem> = JSON.parse(
                localStorage.getItem('tweets')
            )
            const tweetIndex = tweets.findIndex(tweet => tweet.id === tweetID)

            if (tweetIndex === -1) {
                throw new Error(`Tweet with ID ${tweetID} not found`)
            }

            const tweet = tweets[tweetIndex]
            const reaction = tweet.reaction

            const isAlreadyDisliked = reaction.dislikes.users.some(
                item => item === userID
            )

            let updatedReaction
            if (isAlreadyDisliked) {
                const count = (reaction.dislikes.count -= 1 || 0)
                const users = reaction.dislikes.users.filter(
                    (id: TUserCredentialID) => id !== userID
                )

                updatedReaction = {
                    ...reaction,
                    dislikes: {
                        count,
                        users
                    }
                }
            } else {
                const count = (reaction.dislikes.count += 1)
                const users = [...reaction.dislikes.users, userID]

                updatedReaction = {
                    ...reaction,
                    dislikes: {
                        count,
                        users
                    }
                }
            }

            const updatedTweets = [...tweets]
            updatedTweets[tweetIndex].reaction = updatedReaction

            localStorage.setItem('tweets', JSON.stringify(updatedTweets))

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getReaction: async (): Promise<
        Array<Pick<TUserTweetResponseItem, 'comments' | 'reaction' | 'id'>>
    > => {
        try {
            const tweets: Array<TUserTweetResponseItem> = JSON.parse(
                localStorage.getItem('tweets')
            )

            const reaction = tweets.map(t => ({
                id: t.id,
                reaction: t.reaction
            }))

            return reaction || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getSendComment: async (): Promise<TSuccessResponse> => {
        try {
            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getComments: async (): Promise<
        Array<Pick<TUserTweetResponseItem, 'comments' | 'id'>>
    > => {
        return []
    }
}
