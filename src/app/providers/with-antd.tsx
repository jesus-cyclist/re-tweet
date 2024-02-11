import { ConfigProvider, ThemeConfig } from 'antd'
import { WithSprings } from './with-springs'

export const WithAntd = () => {
    // Style will be later
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
