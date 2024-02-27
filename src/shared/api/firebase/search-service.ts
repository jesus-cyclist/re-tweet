import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { firestoreDB } from './config'
import { TSearch } from './types'

export class FirebaseSearch {
    static async updateSearch(userID: string, query: string): Promise<boolean> {
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
            return false
        } else {
            const timestamp = new Date().toISOString()
            const favouriteItem = {
                timestamp,
                query
            }

            await updateDoc(userRef, {
                search: [...searchHistory, favouriteItem]
            })
            return true
        }
    }

    static async getSearchHistory(userID: string): Promise<Array<TSearch>> {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        const searchHistory = userDoc.data()

        return searchHistory?.search || []
    }

    static async deleteSearchHistoryItem(userID: string, query: string) {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        const searchHistory: Array<TSearch> = userDoc.data().search

        const updateHistory = searchHistory.filter(item => item.query !== query)

        await updateDoc(userRef, {
            search: updateHistory
        })
    }

    static async clearSearchHistory(userID: string) {
        const userRef = doc(firestoreDB, 'users', userID)

        await updateDoc(userRef, {
            search: []
        })
    }
}
