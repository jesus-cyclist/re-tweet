import {
    TReadStatusResponseItem,
    TSuccessResponse,
    TUserCredentialID,
    TUserCredentialReadStatus
} from '@/shared/api/db/types/arg'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { openNotification } from '@/shared/lib'
import { firestoreDB } from '../config'

export const readStatus = {
    addReadedStatus: async function ({
        userID,
        data
    }: TUserCredentialReadStatus): Promise<TSuccessResponse> {
        try {
            const userRef = doc(firestoreDB, 'users', userID)
            const userDoc = await getDoc(userRef)

            if (!userDoc.exists()) {
                await setDoc(userRef, { favourites: [], search: [], read: [] })
            }

            const read: Array<TReadStatusResponseItem> = (
                await getDoc(userRef)
            ).data().read
            const isExists = read.some(item => item.data.id === data.id)

            if (isExists) {
                const updatedRead = read.map(item => {
                    if (item.data.id == data.id) {
                        const timestamp = new Date().toISOString()
                        return { ...item, timestamp }
                    }
                    return item
                })

                await updateDoc(userRef, {
                    read: updatedRead
                })
            } else {
                const timestamp = new Date().toISOString()
                const readItem = {
                    timestamp,
                    data
                }

                await updateDoc(userRef, {
                    read: [...read, readItem]
                })
            }

            return { success: true }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getReaded: async (
        userID: TUserCredentialID
    ): Promise<Array<TReadStatusResponseItem>> => {
        try {
            const userRef = doc(firestoreDB, 'users', userID)
            const userDoc = await getDoc(userRef)

            const readCollection = userDoc.data()

            return readCollection?.read || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    }
}
