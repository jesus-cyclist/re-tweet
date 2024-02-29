import {
    TFavourite,
    TSuccess,
    TUserFavourites,
    TUserID
} from '@/shared/api/db/types/arg'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { firestoreDB } from '../config'

export const favourites = {
    toggleFavourite: async function ({
        userID,
        data
    }: TUserFavourites): Promise<TSuccess> {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
            await setDoc(userRef, { favourites: [], search: [] })
        }

        const favourites: Array<TFavourite> = userDoc.data().favourites
        const isExists = favourites.some(item => item.data.id === data.id)

        if (isExists) {
            const filtredFavourites = favourites.filter(
                item => item.data.id !== data.id
            )

            await updateDoc(userRef, {
                favourites: filtredFavourites
            })
        } else {
            const timestamp = new Date().toISOString()
            const favouriteItem = {
                timestamp,
                data
            }

            await updateDoc(userRef, {
                favourites: [...favourites, favouriteItem]
            })
        }

        return { success: true }
    },

    getFavourites: async (userID: TUserID): Promise<Array<TFavourite>> => {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        const favouritesCollection = userDoc.data()

        return favouritesCollection?.favourites || []
    }
}
