import { ConfigProvider, ThemeConfig } from 'antd'
import { WithTheme } from './with-theme'
import { useMemo } from 'react'

export const WithAntd = () => {
    const config: ThemeConfig = useMemo(() => {
        return {
            components: {},
            token: {}
        }
    }, [])
    return (
        <ConfigProvider theme={config}>
            <WithTheme />
        </ConfigProvider>
    )
}
