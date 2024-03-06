import { useAppDispatch, useGetAuthStateQuery } from '@/shared'
import { useEffect, useState } from 'react'
import { accountAction } from '@/features'
import { WithAntd } from './with-antd'
import { Flex, Spin } from 'antd'

export const WithAuth = () => {
    const dispatch = useAppDispatch()
    const [checkAuth, setCheckAuth] = useState(true)
    const { data, isFetching } = useGetAuthStateQuery()

    useEffect(() => {
        if (!isFetching) {
            if (data) {
                dispatch(accountAction.setAccount(data))
            }
            setCheckAuth(false)
        }
    }, [isFetching])

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
