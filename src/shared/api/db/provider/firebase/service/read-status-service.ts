import {
    TReadStatus,
    TSuccess,
    TUserID,
    TUserReadStatus
} from '@/shared/api/db/types/arg'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { firestoreDB } from '../config'

export const readStatus = {
    addReadedStatus: async function ({
        userID,
        data
    }: TUserReadStatus): Promise<TSuccess> {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
            await setDoc(userRef, { favourites: [], search: [], read: [] })
        }

        const read: Array<TReadStatus> = (await getDoc(userRef)).data().read
        const isExists = read.some(item => item.data.id === data.id)

        if (isExists) {
            const filtredRead = read.filter(item => item.data.id !== data.id)

            await updateDoc(userRef, {
                read: filtredRead
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
    },

    getReaded: async (userID: TUserID): Promise<Array<TReadStatus>> => {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        const readCollection = userDoc.data()

        return readCollection?.read || []
    }
}
