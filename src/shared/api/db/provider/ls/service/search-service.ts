import {
    TSearch,
    TSuccess,
    TUserID,
    TUserSearch
} from '@/shared/api/db/types/arg'
import { DocumentData } from 'firebase/firestore'
import { TUser } from '../types'

export const search = {
    getSearchQuery: async ({
        userID,
        query
    }: TUserSearch): Promise<TSuccess> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))

        const userIndex = users.findIndex(user => user.uid === userID)

        if (userIndex === -1) {
            throw new Error(`User with ID ${userID} not found`)
        }

        const user = users[userIndex]
        const search = user.search

        const isExists = search.some(item => item.query === query)

        let updatedSearch
        if (isExists) {
            updatedSearch = search.map(item => {
                if (item.query === query) {
                    const timestamp = new Date().toISOString()
                    return {
                        timestamp,
                        query
                    }
                }
                return item
            })
        } else {
            const timestamp = new Date().toISOString()
            const searchItem = {
                timestamp,
                query
            }
            updatedSearch = [...search, searchItem]
        }

        const updatedUser = { ...user, search: updatedSearch }
        const updatedUsers = [...users]
        updatedUsers[userIndex] = updatedUser

        localStorage.setItem('users', JSON.stringify(updatedUsers))

        return { success: true }
    },

    getSearchHistory: async (
        userID: TUserID
    ): Promise<DocumentData[string]> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))
        const user = users.find(user => user.uid === userID)

        return user.search || []
    },

    deleteSearchHistoryItem: async ({
        userID,
        query
    }: TUserSearch): Promise<TSuccess> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))

        const userIndex = users.findIndex(user => user.uid === userID)

        if (userIndex === -1) {
            throw new Error(`User with ID ${userID} not found`)
        }

        const user = users[userIndex]
        const search = user.search
        const updatedSearch = search.filter(item => item.query !== query)
        const updatedUser = { ...user, search: updatedSearch }
        const updatedUsers = [...users]
        updatedUsers[userIndex] = updatedUser
        localStorage.setItem('users', JSON.stringify(updatedUsers))

        return { success: true }
    },

    clearSearchHistory: async (userID: TUserID): Promise<TSuccess> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))

        const userIndex = users.findIndex(user => user.uid === userID)

        if (userIndex === -1) {
            throw new Error(`User with ID ${userID} not found`)
        }

        const user = users[userIndex]
        const search: Array<TSearch> = []
        const updatedUser = { ...user, search: search }
        const updatedUsers = [...users]
        updatedUsers[userIndex] = updatedUser
        localStorage.setItem('users', JSON.stringify(updatedUsers))

        return { success: true }
    }
}
