import {
    TFavourite,
    TSuccess,
    TUserFavourites,
    TUserID
} from '@/shared/api/db/types/arg'
import { TUser } from '../types'

export const favourites = {
    toggleFavourite: async function ({
        userID,
        data
    }: TUserFavourites): Promise<TSuccess> {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))
        const userIndex = users.findIndex(user => user.uid === userID)

        if (userIndex === -1) {
            throw new Error(`User with ID ${userID} not found`)
        }

        const user = users[userIndex]
        const favourites = user.favourites

        const isExists = favourites.some(item => item.data.id === data.id)

        let updatedFavourites
        if (isExists) {
            updatedFavourites = favourites.filter(
                item => item.data.id !== data.id
            )
        } else {
            const timestamp = new Date().toISOString()
            const favouriteItem = { timestamp, data }
            updatedFavourites = [...favourites, favouriteItem]
        }

        const updatedUser = { ...user, favourites: updatedFavourites }
        const updatedUsers = [...users]
        updatedUsers[userIndex] = updatedUser

        localStorage.setItem('users', JSON.stringify(updatedUsers))

        return { success: true }
    },

    getFavourites: async (userID: TUserID): Promise<Array<TFavourite>> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))

        const user = users.find(user => user.uid === userID)

        return user.favourites || []
    }
}
