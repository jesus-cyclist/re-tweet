import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { TNews } from '../space-flight'
import { firestoreDB } from './config'
import { TFavourite } from './types'

export class FirebaseFavourites {
    static async toggleFavourite(
        userID: string,
        data: TNews
    ): Promise<boolean> {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
            await setDoc(userRef, { userID, favourites: [], search: [] })
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
            return false
        } else {
            const timestamp = new Date().toISOString()
            const favouriteItem = {
                timestamp,
                data
            }

            await updateDoc(userRef, {
                favourites: [...favourites, favouriteItem]
            })
            return true
        }
    }

    static async getFavourites(userID: string) {
        const userRef = doc(firestoreDB, 'users', userID)
        const userDoc = await getDoc(userRef)

        const favouritesCollection = userDoc.data()

        return favouritesCollection?.favourites || []
    }
}
