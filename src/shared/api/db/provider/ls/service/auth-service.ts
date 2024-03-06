import {
    TSuccessResponse,
    TUserCredential,
    TUserTweetResponseItem
} from '../../../types'
import { TAuthUser, openNotification } from '@/shared'
import { TDBStatus, TUser } from '../types'
import bcrypt from 'bcryptjs'
import uniqid from 'uniqid'

export const auth = {
    signUp: async ({
        email,
        password,
        displayName
    }: TUserCredential): Promise<TAuthUser> => {
        try {
            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )

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
                displayName,
                photoURL: '',
                isAuth: true,
                favourites: [],
                search: [],
                read: []
            }

            const updatedUsers = [...users, newUser]

            localStorage.setItem('users', JSON.stringify(updatedUsers))
            localStorage.setItem(
                'lsDB',
                JSON.stringify({ email: email, isAuth: true })
            )

            return { email, uid, displayName, photoURL: newUser.photoURL }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    signIn: async ({
        email,
        password
    }: TUserCredential): Promise<TAuthUser> => {
        try {
            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )

            const user = users.find(user => user?.email === email)

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

            return {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    signOut: async (): Promise<TSuccessResponse> => {
        try {
            const auth: TDBStatus = JSON.parse(localStorage.getItem('lsDB'))
            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )
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
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    authState: async (): Promise<TAuthUser> => {
        try {
            const tweets: Array<TUserTweetResponseItem> = JSON.parse(
                localStorage.getItem('tweets')
            )
            if (!tweets) {
                localStorage.setItem('tweets', JSON.stringify([]))
            }

            const auth: TDBStatus = JSON.parse(localStorage.getItem('lsDB'))

            if (!auth) {
                localStorage.setItem(
                    'lsDB',
                    JSON.stringify({ email: '', isAuth: false })
                )
            }

            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )

            if (!users) {
                localStorage.setItem('users', JSON.stringify([]))
                return null
            }

            const user = users.find(user => user.email === auth?.email)

            if (!user) {
                openNotification.error({ description: 'Non autorized' })
                return
            }

            if (user.isAuth !== auth.isAuth) {
                throw new Error('Something get wrong')
            }

            if (!user.isAuth && auth.isAuth) {
                return null
            }

            return {
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName
            }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getUserData: async (): Promise<
        Pick<TUserCredential, 'photoURL' | 'displayName'>
    > => {
        try {
            const auth: TDBStatus = JSON.parse(localStorage.getItem('lsDB'))

            if (!auth) {
                localStorage.setItem(
                    'lsDB',
                    JSON.stringify({ email: '', isAuth: false })
                )
            }

            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )

            if (!users) {
                localStorage.setItem('users', JSON.stringify([]))
                return null
            }

            const user = users.find(user => user.email === auth?.email)

            if (user.isAuth !== auth.isAuth) {
                throw new Error('Something get wrong')
            }

            if (!user.isAuth && auth.isAuth) {
                return null
            }

            return {
                photoURL: user.photoURL,
                displayName: user.displayName
            }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    updateUserData: async ({
        photoURL,
        displayName
    }: Pick<
        TUserCredential,
        'photoURL' | 'displayName'
    >): Promise<TAuthUser> => {
        try {
            const users: Array<TUser> = JSON.parse(
                localStorage.getItem('users')
            )

            const auth: TDBStatus = JSON.parse(localStorage.getItem('lsDB'))

            if (!auth) {
                localStorage.setItem(
                    'lsDB',
                    JSON.stringify({ email: '', isAuth: false })
                )
            }

            let updatedUser: TUser

            const updatedUsers = [...users].map(u => {
                if (u.email === auth?.email) {
                    updatedUser = {
                        ...u,
                        displayName,
                        photoURL
                    }

                    return updatedUser
                }

                return u
            })

            localStorage.setItem('users', JSON.stringify(updatedUsers))

            return {
                email: updatedUser.email,
                uid: updatedUser.uid,
                displayName,
                photoURL
            }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    }
}
