import { Flex, Spin } from 'antd'
import React from 'react'

export type TLoaderUIProps = {
    isLoading: boolean
}

export const LoaderUI = (props: TLoaderUIProps) => {
    const { isLoading } = props

    if (isLoading) {
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
}
