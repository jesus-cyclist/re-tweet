/* eslint-disable no-console */
import { TUserCredentialFavourites, TUserCredentialID } from '../../db/types'
import { db } from '../../db'

export class FavouriteService {
    static async toggleFavourite({ userID, data }: TUserCredentialFavourites) {
        const isSuccess = await db.favourites.toggleFavourite({ userID, data })
        console.log(isSuccess)
    }

    static async getFavourites(userID: TUserCredentialID) {
        const favourites = await db.favourites.getFavourites(userID)
        console.log(favourites)
    }
}
