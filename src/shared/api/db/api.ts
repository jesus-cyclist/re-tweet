import {
    TFavourite,
    TSuccess,
    TUserCredential,
    TUserFavourites,
    TUserID,
    TUserSearch
} from './types/arg'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { DocumentData } from 'firebase/firestore'
import { openNotification } from '@/shared/lib'
import { TAuthUser } from '@/features'
import { db } from './provider'

export const dbApi = createApi({
    reducerPath: 'db',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['favourites', 'search', 'auth'],
    endpoints: builder => ({
        getSignUp: builder.query<TAuthUser, TUserCredential>({
            queryFn: async ({ email, password }) => {
                try {
                    const res = await db.auth.signUp({ email, password })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['auth']
        }),
        getSignIn: builder.query<TAuthUser, TUserCredential>({
            queryFn: async ({ email, password }) => {
                try {
                    const res = await db.auth.signIn({ email, password })
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['auth']
        }),
        getSignOut: builder.query<TSuccess, void>({
            queryFn: async () => {
                try {
                    const res = await db.auth.signOut()
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['auth']
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

        getToggledFavourite: builder.mutation<TSuccess, TUserFavourites>({
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
        getFavourites: builder.query<Array<TFavourite>, TUserID>({
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
        getSearchQuery: builder.mutation<TSuccess, TUserSearch>({
            queryFn: async ({ userID, query }: TUserSearch) => {
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
        getSearchHistory: builder.query<DocumentData[string], TUserID>({
            queryFn: async (userID: TUserID) => {
                try {
                    const res = await db.search.getSearchHistory(userID)
                    return { data: res }
                } catch (error) {
                    openNotification.error({ description: error.message })
                }
            },
            providesTags: ['search']
        }),
        deleteSearchHistoryItem: builder.mutation<TSuccess, TUserSearch>({
            queryFn: async ({ userID, query }: TUserSearch) => {
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
        clearSearchHistory: builder.mutation<TSuccess, TUserID>({
            queryFn: async (userID: TUserID) => {
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
        })
    })
})
