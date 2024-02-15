import { ConfigProvider, ThemeConfig } from 'antd'
import { WithSprings } from './with-springs'

export const WithAntd = () => {
    const config: ThemeConfig = {
        components: {},
        token: {}
    }
    return (
        <ConfigProvider theme={config}>
            <WithSprings />
        </ConfigProvider>
    )
}
