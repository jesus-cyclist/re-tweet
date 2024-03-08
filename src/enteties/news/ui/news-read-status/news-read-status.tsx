import {
    useAppDispatch,
    useGetAuthStateQuery,
    useLazyGetReadedQuery
} from '@/shared'
import { FieldTimeOutlined } from '@ant-design/icons'
import s from './news-read-status.module.scss'
import { statisticsActions } from '@/widgets'
import { useEffect, useMemo } from 'react'
import classNames from 'classnames'

type Props = {
    id: number
}

export const NewsReadStatus = (props: Props): JSX.Element => {
    const { id } = props
    const { data: userData } = useGetAuthStateQuery()
    const [fetchReaded, { data: readedData = [] }] = useLazyGetReadedQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (userData) {
            fetchReaded(userData?.uid).then(res =>
                dispatch(statisticsActions.addReadBefore(res.data))
            )
        }
    }, [userData])

    const isReaded = useMemo(() => {
        return readedData.some(d => d.data.id === id)
    }, [readedData])

    const getActiveClassName = useMemo(() => {
        return isReaded
            ? classNames(s.container, s.containerActive)
            : s.container
    }, [isReaded])

    return (
        <div className={getActiveClassName}>
            <FieldTimeOutlined />
        </div>
    )
}
