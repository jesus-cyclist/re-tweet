import { ClientRoutes, LinkUI } from '@/shared'
import { Button, Result } from 'antd'
import s from './404.module.scss'
import React from 'react'

const ForbidenPage = () => {
    return (
        <Result
            className={s.container}
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
                <Button type='primary'>
                    <LinkUI to={ClientRoutes.MAIN_PATH}>Back Home</LinkUI>
                </Button>
            }
        />
    )
}

export default ForbidenPage
