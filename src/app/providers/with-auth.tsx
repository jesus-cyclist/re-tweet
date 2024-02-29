import { LoaderUI, dbApi, useAppDispatch } from '@/shared'
import { useEffect, useState } from 'react'
import { accountAction } from '@/features'
import { WithAntd } from './with-antd'

export const WithAuth = () => {
    const dispatch = useAppDispatch()
    const [checkAuth, setCheckAuth] = useState(true)
    const { data, isFetching } = dbApi.useGetAuthStateQuery()

    useEffect(() => {
        if (!isFetching) {
            if (data) {
                const { email, uid } = data
                dispatch(accountAction.setAccount({ email, uid }))
            }
            setCheckAuth(false)
        }
    }, [isFetching])

    if (checkAuth) {
        return <LoaderUI isLoading />
    }

    return <WithAntd />
}
