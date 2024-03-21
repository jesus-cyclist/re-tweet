import {
    TAuthUser,
    TFavouriteResponseItem,
    TReadStatusResponseItem,
    TSearchResponseItem,
    TSuccessResponse,
    TUserCredential,
    TUserCredentialFavourites,
    TUserCredentialID,
    TUserCredentialReadStatus,
    TUserCredentialSearch
} from './types/arg'
import {
    TCredentialLikeTweet,
    TCredentialTweet,
    TUserTweetResponseItem
} from '..'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { TCredentialCommentTweet } from './types/tweet'
import { openNotification } from '@/shared/lib'
import { db } from './provider'

export const dbApi = createApi({
    reducerPath: 'db',
    baseQuery: fakeBaseQuery(),
    tagTypes: [
        'favourites',
        'search',
        'auth',
        'read',
        'tweet',
        'tweet-reaction',
        'tweet-comments'
    ],
    endpoints: builder => ({
        getSignUp: builder.mutation<TAuthUser, TUserCredential>({
            queryFn: async ({ email, password, displayName, photoURL }) => {
                try {
                    const res = await db.auth.signUp({
                        email,
                        password,
                        displayName,
                        photoURL
                    })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['auth']
        }),
        getUserData: builder.query<
            Pick<TUserCredential, 'photoURL' | 'displayName'>,
            void
        >({
            queryFn: async () => {
                try {
                    const res = await db.auth.getUserData()
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['auth']
        }),
        getUpdateUserData: builder.mutation<
            TAuthUser,
            Pick<TUserCredential, 'photoURL' | 'displayName'>
        >({
            queryFn: async ({ displayName, photoURL }) => {
                try {
                    const res = await db.auth.updateUserData({
                        displayName,
                        photoURL
                    })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['auth']
        }),
        getSignIn: builder.mutation<TAuthUser, TUserCredential>({
            queryFn: async ({ email, password }) => {
                try {
                    const res = await db.auth.signIn({ email, password })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['auth']
        }),
        getSignOut: builder.mutation<TSuccessResponse, void>({
            queryFn: async () => {
                try {
                    const res = await db.auth.signOut()
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['auth']
        }),
        getAuthState: builder.query<TAuthUser, void>({
            queryFn: async () => {
                try {
                    const res = await db.auth.authState()
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['auth']
        }),

        getToggledFavourite: builder.mutation<
            TSuccessResponse,
            TUserCredentialFavourites
        >({
            queryFn: async ({ userID, data }) => {
                try {
                    const res = await db.favourites.toggleFavourite({
                        userID,
                        data
                    })

                    const result = res.success

                    openNotification.success({
                        description: `Successfully ${result ? 'added' : 'deleted'}`
                    })

                    return {
                        data: res
                    }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['favourites']
        }),
        getFavourites: builder.query<
            Array<TFavouriteResponseItem>,
            TUserCredentialID
        >({
            queryFn: async userID => {
                try {
                    const res = await db.favourites.getFavourites(userID)
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['favourites']
        }),
        getSearchQuery: builder.mutation<
            TSuccessResponse,
            TUserCredentialSearch
        >({
            queryFn: async ({ userID, query }: TUserCredentialSearch) => {
                try {
                    const res = await db.search.getSearchQuery({
                        userID,
                        query
                    })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['search']
        }),
        getSearchHistory: builder.query<
            Array<TSearchResponseItem>,
            TUserCredentialID
        >({
            queryFn: async (userID: TUserCredentialID) => {
                try {
                    const res = await db.search.getSearchHistory(userID)
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['search']
        }),
        deleteSearchHistoryItem: builder.mutation<
            TSuccessResponse,
            TUserCredentialSearch
        >({
            queryFn: async ({ userID, query }: TUserCredentialSearch) => {
                try {
                    const res = await db.search.deleteSearchHistoryItem({
                        userID,
                        query
                    })
                    openNotification.success({
                        description: 'The message has been deleted'
                    })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['search']
        }),
        clearSearchHistory: builder.mutation<
            TSuccessResponse,
            TUserCredentialID
        >({
            queryFn: async (userID: TUserCredentialID) => {
                try {
                    const res = await db.search.clearSearchHistory(userID)
                    openNotification.success({
                        description: 'The history has been cleared'
                    })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['search']
        }),

        getAddReadedStatus: builder.mutation<
            TSuccessResponse,
            TUserCredentialReadStatus
        >({
            queryFn: async ({ userID, data }) => {
                try {
                    const res = await db.readed.addReadedStatus({
                        userID,
                        data
                    })

                    return {
                        data: res
                    }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['read']
        }),
        getReaded: builder.query<
            Array<TReadStatusResponseItem>,
            TUserCredentialID
        >({
            queryFn: async userID => {
                try {
                    const res = await db.readed.getReaded(userID)
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['read']
        }),

        getPostTweet: builder.mutation<TSuccessResponse, TCredentialTweet>({
            queryFn: async ({
                author,
                tweetedPost,
                tweetMessage,
                hashtags = []
            }) => {
                try {
                    const res = await db.tweet.postTweet({
                        author,
                        tweetedPost,
                        tweetMessage,
                        hashtags
                    })

                    return {
                        data: res
                    }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['tweet']
        }),
        getTweets: builder.query<
            Array<Omit<TUserTweetResponseItem, 'comments' | 'reaction'>>,
            void
        >({
            queryFn: async () => {
                try {
                    const res = await db.tweet.getTweets()
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['tweet']
        }),
        getLikeTweet: builder.mutation<TSuccessResponse, TCredentialLikeTweet>({
            queryFn: async ({ userID, tweetID }) => {
                try {
                    const res = await db.tweet.getLikeTweet({ userID, tweetID })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['tweet-reaction']
        }),
        getDislikeTweet: builder.mutation<
            TSuccessResponse,
            TCredentialLikeTweet
        >({
            queryFn: async ({ userID, tweetID }) => {
                try {
                    const res = await db.tweet.getDislikeTweet({
                        userID,
                        tweetID
                    })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['tweet-reaction']
        }),
        getReaction: builder.query<
            Array<Pick<TUserTweetResponseItem, 'reaction' | 'id'>>,
            void
        >({
            queryFn: async () => {
                try {
                    const res = await db.tweet.getReaction()
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['tweet-reaction']
        }),

        getComments: builder.query<
            Array<Pick<TUserTweetResponseItem, 'comments' | 'id'>>,
            void
        >({
            queryFn: async () => {
                try {
                    const res = await db.tweet.getComments()
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['tweet-comments']
        }),

        getSendComment: builder.mutation<
            TSuccessResponse,
            TCredentialCommentTweet
        >({
            queryFn: async ({ tweetID, data }) => {
                try {
                    const res = await db.tweet.getSendComment({
                        tweetID,
                        data
                    })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            invalidatesTags: ['tweet-comments']
        })
    })
})

export const {
    useClearSearchHistoryMutation,
    useDeleteSearchHistoryItemMutation,
    useGetAddReadedStatusMutation,
    useGetAuthStateQuery,
    useGetFavouritesQuery,
    useGetPostTweetMutation,
    useGetReadedQuery,
    useGetSearchHistoryQuery,
    useGetSearchQueryMutation,
    useGetToggledFavouriteMutation,
    useGetTweetsQuery,
    useLazyGetAuthStateQuery,
    useLazyGetFavouritesQuery,
    useLazyGetReadedQuery,
    useLazyGetSearchHistoryQuery,
    useLazyGetTweetsQuery,
    useGetDislikeTweetMutation,
    useGetLikeTweetMutation,
    useGetReactionQuery,
    useLazyGetReactionQuery,
    useGetUserDataQuery,
    useLazyGetUserDataQuery,
    useGetSignInMutation,
    useGetSignOutMutation,
    useGetSignUpMutation,
    useGetUpdateUserDataMutation,
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useGetSendCommentMutation
} = dbApi
