import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import type { TBuildOptions } from './types/types'

export function buildDevServer(options: TBuildOptions): DevServerConfiguration {
    const { mode, port } = options
    const isDev = mode === 'development'

    const devServer = {
        port: port ?? 3000,
        open: true,
        historyApiFallback: true,
        hot: true
    }

    return isDev ? devServer : undefined
}
