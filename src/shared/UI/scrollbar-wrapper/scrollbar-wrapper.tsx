import Scrollbars from 'react-custom-scrollbars-2'
import s from './scrollbar-wrapper.module.scss'
import { ReactNode } from 'react'

type TScrollbarWrapperProps = {
    children: ReactNode
}

export const ScrollbarWrapper = (props: TScrollbarWrapperProps) => {
    const { children } = props

    return (
        <Scrollbars
            className={s.scrollbar}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderTrackVertical={({ ...props }) => (
                <div {...props} className={s.scrollbar__track} />
            )}
            renderThumbVertical={props => (
                <div {...props} className={s.scrollbar__thumb} />
            )}
            renderView={props => <div {...props} className='view' />}
        >
            {children}
        </Scrollbars>
    )
}
