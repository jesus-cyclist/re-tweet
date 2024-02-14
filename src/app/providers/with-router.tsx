import { BrowserRouter } from 'react-router-dom'
import { WithRedux } from './with-redux'
import { Flex, Spin } from 'antd'
import { Suspense } from 'react'

export const WithRouter = () => {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <Flex
                        style={{ width: '100%', height: '100%' }}
                        align='center'
                        justify='center'
                        gap='middle'
                    >
                        <Spin size='large' />
                    </Flex>
                }
            >
                <WithRedux />
            </Suspense>
        </BrowserRouter>
    )
}
