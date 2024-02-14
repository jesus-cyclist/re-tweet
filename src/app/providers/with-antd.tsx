import { ConfigProvider, ThemeConfig } from 'antd'
import { WithSprings } from './with-springs'

export const WithAntd = () => {
    // все стили после всего функционала
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
