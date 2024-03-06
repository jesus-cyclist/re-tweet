import {
    TReadStatusResponseItem,
    TSuccessResponse,
    TUserCredentialID,
    TUserCredentialReadStatus
} from '@/shared/api/db/types/arg'
import { openNotification } from '@/shared/lib'
import { TUser } from '../types'

export const readStatus = {
    addReadedStatus: async function ({
        userID,
        data
    }: TUserCredentialReadStatus): Promise<TSuccessResponse> {
        try {
            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )
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
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getReaded: async (
        userID: TUserCredentialID
    ): Promise<Array<TReadStatusResponseItem>> => {
        try {
            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )

            const user = users.find(user => user.uid === userID)

            return user.read || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    }
}
