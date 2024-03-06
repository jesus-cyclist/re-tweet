import { FieldTimeOutlined } from '@ant-design/icons'
import s from './news-read-status.module.scss'
import classNames from 'classnames'
import { useMemo } from 'react'

type Props = {
    readed: boolean
}

export const NewsReadStatus = (props: Props): JSX.Element => {
    const { readed } = props

    const getActiveClassName = useMemo(() => {
        return readed ? classNames(s.container, s.containerActive) : s.container
    }, [readed])

    return (
        <div className={getActiveClassName}>
            <FieldTimeOutlined />
        </div>
    )
}
