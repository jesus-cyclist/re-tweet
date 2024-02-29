import {
    DocumentData,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore'
import { TUserID, TUserSearch } from '@/shared/api/db/types/arg'
import { TSearch, TSuccess } from '@/shared/api/db/types/arg'
import { firestoreDB } from '../config'

export const search = {
    getSearchQuery: async ({
        userID,
        query
    }: TUserSearch): Promise<TSuccess> => {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
            await setDoc(userRef, { userID, favourites: [], search: [] })
        }

        const searchHistory: Array<TSearch> = userDoc.data().search
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
    },

    getSearchHistory: async (
        userID: TUserID
    ): Promise<DocumentData[string]> => {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        const searchHistory = userDoc.data()

        return searchHistory?.search || []
    },

    deleteSearchHistoryItem: async ({
        userID,
        query
    }: TUserSearch): Promise<TSuccess> => {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        const searchHistory: Array<TSearch> = userDoc.data().search

        const updateHistory = searchHistory.filter(item => item.query !== query)

        await updateDoc(userRef, {
            search: updateHistory
        })

        return { success: true }
    },

    clearSearchHistory: async (userID: TUserID): Promise<TSuccess> => {
        const userRef = doc(firestoreDB, 'users', userID)

        await updateDoc(userRef, {
            search: []
        })

        return { success: true }
    }
}
