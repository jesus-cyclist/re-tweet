import {
    TReadStatus,
    TSuccess,
    TUserID,
    TUserReadStatus
} from '@/shared/api/db/types/arg'
import { TUser } from '../types'

export const readStatus = {
    addReadedStatus: async function ({
        userID,
        data
    }: TUserReadStatus): Promise<TSuccess> {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))
        const userIndex = users.findIndex(user => user.uid === userID)

        if (userIndex === -1) {
            throw new Error(`User with ID ${userID} not found`)
        }

        const user = users[userIndex]
        const read = user.read

        const isExists = read.some(item => item.data.id === data.id)

        let updatedRead
        if (isExists) {
            updatedRead = read.filter(item => item.data.id !== data.id)
        } else {
            const timestamp = new Date().toISOString()
            const readItem = { timestamp, data }
            updatedRead = [...read, readItem]
        }

        const updatedUser = { ...user, read: updatedRead }
        const updatedUsers = [...users]
        updatedUsers[userIndex] = updatedUser

        localStorage.setItem('users', JSON.stringify(updatedUsers))

        return { success: true }
    },

    getReaded: async (userID: TUserID): Promise<Array<TReadStatus>> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))

        const user = users.find(user => user.uid === userID)

        return user.read || []
    }
}
