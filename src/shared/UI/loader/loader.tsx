import { Flex, Spin } from 'antd'

type TLoaderUI = {
    isLoading: boolean
}

export const LoaderUI = (props: TLoaderUI) => {
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
