/* eslint-disable no-console */
import { TUserReadStatus } from '../../db/types/arg'
import { TUserID } from '../../db/types'
import { db } from '../../db'

export class ReadedService {
    static async addReadedStatus({ userID, data }: TUserReadStatus) {
        const isSuccess = await db.readed.addReadedStatus({ userID, data })
        console.log(isSuccess)
    }

    static async getReaded(userID: TUserID) {
        const readed = await db.readed.getReaded(userID)
        console.log(readed)
    }
}
