import {
    User,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

export class FirebaseAuth {
    static async signUp(email: string, password: string) {
        const auth = getAuth()
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        return result
    }

    static async signIn(email: string, password: string) {
        const auth = getAuth()
        const result = await signInWithEmailAndPassword(auth, email, password)
        return result
    }

    static async signOut() {
        const auth = getAuth()
        const result = signOut(auth)
        return result
    }

    static authState(cb: (user: User | null) => void) {
        const auth = getAuth()
        const result = onAuthStateChanged(auth, cb)
        return result
    }
}
