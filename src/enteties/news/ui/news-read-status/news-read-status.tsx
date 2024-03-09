import {
    useAppDispatch,
    useGetAuthStateQuery,
    useGetReadedQuery
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
    const { data: readedData = [] } = useGetReadedQuery(userData?.uid, {
        skip: !userData?.uid
    })
    const dispatch = useAppDispatch()

    useEffect(() => {
        //используется, чтобы добавить данные о прочитанных записях в статистику, когда они становятся доступны
        if (readedData) {
            dispatch(statisticsActions.addReadBefore(readedData))
        }
    }, [readedData])

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
