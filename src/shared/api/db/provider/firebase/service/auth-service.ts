import {
    User,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { TSuccess, TUserCredential } from '../../../types'
import { TAuthUser } from '@/features'

export const auth = {
    signUp: async ({
        email,
        password
    }: TUserCredential): Promise<TAuthUser> => {
        const auth = getAuth()
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        ).then(userCredential => {
            const { email, uid } = userCredential.user
            return { email, uid }
        })

        return result
    },

    signIn: async ({
        email,
        password
    }: TUserCredential): Promise<TAuthUser> => {
        const auth = getAuth()
        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        ).then(userCredential => {
            const { email, uid } = userCredential.user
            return { email, uid }
        })

        return result
    },

    signOut: async (): Promise<TSuccess> => {
        const auth = getAuth()
        await signOut(auth)
        return {
            success: true
        }
    },

    authState: async (): Promise<TAuthUser> => {
        const result = await new Promise<TAuthUser | null>(
            (resolve, reject) => {
                const auth = getAuth()
                const unsubscribe = auth.onAuthStateChanged(
                    (user: User | null) => {
                        if (user) {
                            const { email, uid } = user
                            resolve({ email, uid })
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
    }
}
