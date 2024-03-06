import {
    User,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'
import { TSuccessResponse, TUserCredential } from '../../../types'
import { TAuthUser, openNotification } from '@/shared'

export const auth = {
    signUp: async ({
        email,
        password,
        displayName,
        photoURL
    }: TUserCredential): Promise<TAuthUser> => {
        try {
            const auth = getAuth()
            await createUserWithEmailAndPassword(auth, email, password)
            const result = await updateProfile(auth.currentUser, {
                displayName,
                photoURL
            }).then(() => {
                const updatedUser = auth.currentUser
                return updatedUser
            })

            return {
                displayName: result.displayName,
                email: result.email,
                photoURL: result.photoURL,
                uid: result.uid
            }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    signIn: async ({
        email,
        password
    }: TUserCredential): Promise<TAuthUser> => {
        try {
            const auth = getAuth()
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            ).then(userCredential => {
                const { email, uid, displayName, photoURL } =
                    userCredential.user
                return { email, uid, displayName, photoURL }
            })

            return result
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    signOut: async (): Promise<TSuccessResponse> => {
        const auth = getAuth()
        await signOut(auth)
        return {
            success: true
        }
    },

    authState: async (): Promise<TAuthUser> => {
        try {
            const result = await new Promise<TAuthUser | null>(
                (resolve, reject) => {
                    const auth = getAuth()

                    const unsubscribe = auth.onAuthStateChanged(
                        (user: User | null) => {
                            if (user) {
                                const { email, uid, displayName, photoURL } =
                                    user
                                resolve({ email, uid, displayName, photoURL })
                            } else {
                                resolve(null)
                            }
                            unsubscribe()
                        },
                        reject
                    )
                }
            )

            return result
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    },

    getUserData: async (): Promise<
        Pick<TUserCredential, 'photoURL' | 'displayName'>
    > => {
        try {
            const auth = getAuth()
            const result = auth.currentUser

            return {
                photoURL: result.photoURL,
                displayName: result.displayName
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
            const auth = getAuth()
            const result = await updateProfile(auth.currentUser, {
                photoURL,
                displayName
            }).then(() => {
                const updatedUser = auth.currentUser
                return updatedUser
            })

            return {
                displayName: result.displayName,
                email: result.email,
                photoURL: result.photoURL,
                uid: result.uid
            }
        } catch (error) {
            openNotification.error({ description: error.message })
        }
    }
}
