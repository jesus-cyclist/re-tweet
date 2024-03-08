import {
    TSearchResponseItem,
    TSuccessResponse,
    TUserCredentialID,
    TUserCredentialSearch
} from '@/shared/api/db/types/arg'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { openNotification } from '@/shared/lib'
import { firestoreDB } from '../config'

export const search = {
    getSearchQuery: async ({
        userID,
        query
    }: TUserCredentialSearch): Promise<TSuccessResponse> => {
        try {
            const userRef = doc(firestoreDB, 'users', userID)
            const userDoc = await getDoc(userRef)

            if (!userDoc.exists()) {
                await setDoc(userRef, { favourites: [], search: [], read: [] })
            }

            const searchHistory: Array<TSearchResponseItem> = (
                await getDoc(userRef)
            ).data().search
            const isExists = searchHistory.some(item => item.query === query)

            if (isExists) {
                const updateHistory = searchHistory.map(item => {
                    if (item.query === query) {
                        const timestamp = new Date().toISOString()
                        return {
                            timestamp,
                            query
                        }
                    }

                    return item
                })

                await updateDoc(userRef, {
                    search: updateHistory
                })
            } else {
                const timestamp = new Date().toISOString()
                const favouriteItem = {
                    timestamp,
                    query
                }

                await updateDoc(userRef, {
                    search: [...searchHistory, favouriteItem]
                })
            }

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getSearchHistory: async (
        userID: TUserCredentialID
    ): Promise<Array<TSearchResponseItem>> => {
        try {
            const userRef = doc(firestoreDB, 'users', userID)
            const userDoc = await getDoc(userRef)

            const data = userDoc.data()
            const searchHistory: Array<TSearchResponseItem> = await data.search

            return searchHistory || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    deleteSearchHistoryItem: async ({
        userID,
        query
    }: TUserCredentialSearch): Promise<TSuccessResponse> => {
        try {
            const userRef = doc(firestoreDB, 'users', userID)
            const userDoc = await getDoc(userRef)

            const searchHistory: Array<TSearchResponseItem> =
                userDoc.data().search

            const updateHistory = searchHistory.filter(
                item => item.query !== query
            )

            await updateDoc(userRef, {
                search: updateHistory
            })

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    clearSearchHistory: async (
        userID: TUserCredentialID
    ): Promise<TSuccessResponse> => {
        try {
            const userRef = doc(firestoreDB, 'users', userID)

            await updateDoc(userRef, {
                search: []
            })

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    }
}
