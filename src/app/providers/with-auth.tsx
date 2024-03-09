import { useAppDispatch, useGetAuthStateQuery } from '@/shared'
import { useEffect, useState } from 'react'
import { WithAntd } from './with-antd'
import { onAuth } from '@/features'
import { Flex, Spin } from 'antd'

export const WithAuth = () => {
    const dispatch = useAppDispatch()
    const [checkAuth, setCheckAuth] = useState(true)
    const { data, isLoading } = useGetAuthStateQuery()

    useEffect(() => {
        //жду завершения запроса на статус профиля, и синхронизирую будущий статус приложения с статусом из Firebase
        if (!isLoading) {
            if (data) {
                dispatch(onAuth())
            }
            setCheckAuth(false)
        }
    }, [isLoading])

    if (checkAuth) {
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
