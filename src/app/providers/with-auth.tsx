import { FirebaseAuth, LoaderUI, useAppDispatch } from '@/shared'
import { useEffect, useState } from 'react'
import { accountAction } from '@/features'
import { WithAntd } from './with-antd'
import { User } from 'firebase/auth'

export const WithAuth = () => {
    const dispatch = useAppDispatch()
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        FirebaseAuth.authState((user: User) => {
            if (user) {
                const { email, uid } = user
                dispatch(accountAction.setAccount({ email, uid }))
            }
            setIsAuth(true)
        })
    }, [])

    if (!isAuth) {
        return <LoaderUI isLoading />
    }

    return <WithAntd />
}
