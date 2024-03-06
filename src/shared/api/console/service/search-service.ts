/* eslint-disable no-console */
import { TUserCredentialSearch } from '../../db/types/arg'
import { TUserCredentialID } from '../../db/types'
import { db } from '../../db'

export class SearchService {
    static async getSearchQuery({ userID, query }: TUserCredentialSearch) {
        const isSuccess = await db.search.getSearchQuery({ userID, query })
        console.log(isSuccess)
    }

    static async getSearchHistory(userID: TUserCredentialID) {
        const searchHistory = await db.search.getSearchHistory(userID)
        console.log(searchHistory)
    }

    static async deleteSearchHistoryItem({
        userID,
        query
    }: TUserCredentialSearch) {
        const isSuccess = await db.search.deleteSearchHistoryItem({
            userID,
            query
        })
        console.log(isSuccess)
    }

    static async clearSearchHistory(userID: TUserCredentialID) {
        const isSuccess = await db.search.clearSearchHistory(userID)
        console.log(isSuccess)
    }
}
