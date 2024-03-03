/* eslint-disable no-console */
import { TUserSearch } from '../../db/types/arg'
import { TUserID } from '../../db/types'
import { db } from '../../db'

export class SearchService {
    static async getSearchQuery({ userID, query }: TUserSearch) {
        const isSuccess = await db.search.getSearchQuery({ userID, query })
        console.log(isSuccess)
    }

    static async getSearchHistory(userID: TUserID) {
        const searchHistory = await db.search.getSearchHistory(userID)
        console.log(searchHistory)
    }

    static async deleteSearchHistoryItem({ userID, query }: TUserSearch) {
        const isSuccess = await db.search.deleteSearchHistoryItem({
            userID,
            query
        })
        console.log(isSuccess)
    }

    static async clearSearchHistory(userID: TUserID) {
        const isSuccess = await db.search.clearSearchHistory(userID)
        console.log(isSuccess)
    }
}
