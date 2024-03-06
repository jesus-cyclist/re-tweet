import {
    TFavouriteResponseItem,
    TSuccessResponse,
    TUserCredentialFavourites,
    TUserCredentialID
} from '@/shared/api/db/types/arg'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { openNotification } from '@/shared/lib'
import { firestoreDB } from '../config'

export const favourites = {
    toggleFavourite: async function ({
        userID,
        data
    }: TUserCredentialFavourites): Promise<TSuccessResponse> {
        try {
            const userRef = doc(firestoreDB, 'users', userID)
            const userDoc = await getDoc(userRef)

            if (!userDoc.exists()) {
                await setDoc(userRef, { favourites: [], search: [], read: [] })
            }

            const favourites: Array<TFavouriteResponseItem> = (
                await getDoc(userRef)
            ).data().favourites

            const isExists = favourites.some(item => item.data.id === data.id)

            if (isExists) {
                const filtredFavourites = favourites.filter(
                    item => item.data.id !== data.id
                )

                await updateDoc(userRef, {
                    favourites: filtredFavourites
                })
                return { success: false }
            } else {
                const timestamp = new Date().toISOString()
                const favouriteItem = {
                    timestamp,
                    data
                }

                await updateDoc(userRef, {
                    favourites: [...favourites, favouriteItem]
                })
                return { success: true }
            }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getFavourites: async (
        userID: TUserCredentialID
    ): Promise<Array<TFavouriteResponseItem>> => {
        try {
            const userRef = doc(firestoreDB, 'users', userID)
            const userDoc = await getDoc(userRef)

            const favouritesCollection = userDoc.data()

            return favouritesCollection?.favourites || []
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    }
}
