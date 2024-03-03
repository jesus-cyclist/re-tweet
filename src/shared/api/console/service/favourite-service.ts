/* eslint-disable no-console */
import { TUserFavourites, TUserID } from '../../db/types'
import { db } from '../../db'

export class FavouriteService {
    static async toggleFavourite({ userID, data }: TUserFavourites) {
        const isSuccess = await db.favourites.toggleFavourite({ userID, data })
        console.log(isSuccess)
    }

    static async getFavourites(userID: TUserID) {
        const favourites = await db.favourites.getFavourites(userID)
        console.log(favourites)
    }
}
