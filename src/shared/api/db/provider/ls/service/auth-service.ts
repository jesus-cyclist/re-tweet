import { TSuccess, TUserCredential } from '../../../types'
import { TDBStatus, TUser } from '../types'
import { TAuthUser } from '@/features'
import bcrypt from 'bcryptjs'
import uniqid from 'uniqid'

export const auth = {
    signUp: async ({
        email,
        password
    }: TUserCredential): Promise<TAuthUser> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))

        if (!users) {
            localStorage.setItem('users', JSON.stringify([]))
        }

        const isExists = users.some(user => user.email === email)

        if (isExists) {
            throw new Error(`User with that ${email} already exists`)
        }

        const hashPasword = await bcrypt.hash(password, 3)
        const uid = uniqid()
        const newUser: TUser = {
            uid,
            email,
            password: hashPasword,
            isAuth: true,
            favourites: [],
            search: []
        }

        const updatedUsers = [...users, newUser]

        localStorage.setItem('users', JSON.stringify(updatedUsers))
        localStorage.setItem(
            'lsDB',
            JSON.stringify({ email: email, isAuth: true })
        )

        return { email, uid }
    },

    signIn: async ({
        email,
        password
    }: TUserCredential): Promise<TAuthUser> => {
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))

        if (!users) {
            localStorage.setItem('users', JSON.stringify([]))
        }

        const user = users.find(user => user.email === email)

        if (!user) {
            throw new Error(`User with that ${email} not found`)
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if (!isPassEqual) {
            throw new Error(`Wrong password`)
        }

        const updatedUsers = users.map(user => {
            if (user.email === email) {
                return { ...user, isAuth: true }
            }
            return user
        })

        localStorage.setItem('users', JSON.stringify(updatedUsers))
        localStorage.setItem(
            'lsDB',
            JSON.stringify({ email: user.email, isAuth: true })
        )

        return { email: user.email, uid: user.uid }
    },

    signOut: async (): Promise<TSuccess> => {
        const auth: TDBStatus = JSON.parse(localStorage.getItem('lsDB'))
        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))
        const user = users.find(user => user.email === auth.email)

        if (user.isAuth !== auth.isAuth) {
            throw new Error('Something get wrong, try to reload page')
        }

        const updatedUsers = users.map(user => {
            if (user.email === auth.email) {
                return { ...user, isAuth: false }
            }
            return user
        })

        localStorage.setItem('users', JSON.stringify(updatedUsers))
        localStorage.removeItem('lsDB')

        return {
            success: true
        }
    },

    authState: async (): Promise<TAuthUser> => {
        const auth: TDBStatus = JSON.parse(localStorage.getItem('lsDB'))
        const { email } = auth

        const users: Array<TUser> = JSON.parse(localStorage.getItem('users'))
        const user = users.find(user => user.email === email)

        if (user.isAuth !== auth.isAuth) {
            throw new Error('Something get wrong')
        }

        if (!user.isAuth && auth.isAuth) {
            return null
        }

        return {
            email: user.email,
            uid: user.uid
        }
    }
}
