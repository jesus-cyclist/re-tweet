import { CSSTransition } from 'react-transition-group'
import { FieldTimeOutlined } from '@ant-design/icons'
import s from './news-read-status.module.scss'
import { useRef } from 'react'

type TNewsReadStatusProps = {
    readed: boolean
}

export const NewsReadStatus = (props: TNewsReadStatusProps): JSX.Element => {
    const { readed } = props
    const ref = useRef(null)

    return (
        <CSSTransition
            nodeRef={ref}
            in={readed}
            timeout={200}
            classNames={{
                enter: s.containerEnter,
                enterDone: s.containerEnterDone
            }}
        >
            <div className={s.container} ref={ref}>
                <FieldTimeOutlined />
            </div>
        </CSSTransition>
    )
}
