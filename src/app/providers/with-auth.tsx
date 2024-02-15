import { FirebaseAuth, useAppDispatch } from '@/shared'
import { useEffect, useState } from 'react'
import { accountAction } from '@/features'
import { WithAntd } from './with-antd'
import { User } from 'firebase/auth'
import { Flex, Spin } from 'antd'

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
        return (
            <Flex
                style={{ width: '100%', height: '100%' }}
                align='center'
                justify='center'
                gap='middle'
            >
                <Spin size='large' />
            </Flex>
        )
    }

    return <WithAntd />
}
