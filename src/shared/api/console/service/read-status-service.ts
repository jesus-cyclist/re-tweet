/* eslint-disable no-console */
import { TUserCredentialReadStatus } from '../../db/types/arg'
import { TUserCredentialID } from '../../db/types'
import { db } from '../../db'

export class ReadedService {
    static async addReadedStatus({ userID, data }: TUserCredentialReadStatus) {
        const isSuccess = await db.readed.addReadedStatus({ userID, data })
        console.log(isSuccess)
    }

    static async getReaded(userID: TUserCredentialID) {
        const readed = await db.readed.getReaded(userID)
        console.log(readed)
    }
}
