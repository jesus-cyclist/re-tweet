import s from './loader.module.scss'
import { Flex, Spin } from 'antd'
import React from 'react'

export type TLoaderUIProps = {
    isLoading: boolean
}

export const LoaderUI = (props: TLoaderUIProps): JSX.Element => {
    const { isLoading } = props

    if (isLoading) {
        return (
            <Flex
                className={s.loader}
                style={{ width: '100%', height: '100%' }}
                align='center'
                justify='center'
                gap='middle'
            >
                <Spin size='large' className={s.spin} />
            </Flex>
        )
    }
}
