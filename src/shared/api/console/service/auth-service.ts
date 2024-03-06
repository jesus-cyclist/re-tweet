/* eslint-disable no-console */
import { TUserCredential } from '../../db/types'
import { TAuthUser } from '@/shared'
import { db } from '../../db'

export class AuthService {
    static async signUp({ email, password }: TUserCredential) {
        const isValid = this.validateFields({ email, password })

        if (isValid) {
            const user = await db.auth.signUp({ email, password })
            console.log(user)
        } else {
            console.log('Credentials not valid')
        }
    }

    static async signIn({ email, password }: TUserCredential) {
        const isValid = this.validateFields({ email, password })

        if (isValid) {
            const user = await db.auth.signIn({ email, password })
            console.log(user)
        } else {
            console.log('Credentials not valid')
        }
    }

    static async signOut() {
        await db.auth.signOut().then(res => console.log(res))
    }

    static authState(): Promise<TAuthUser> {
        return db.auth.authState()
    }

    private static validateFields({ email, password }: TUserCredential) {
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValidEmail = emailReg.test(email)
        const isPassValid = `${password}`.length > 5

        if (isValidEmail && isPassValid) {
            return true
        }

        return false
    }
}
