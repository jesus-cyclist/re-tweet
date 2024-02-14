// eslint-disable-next-line
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { type TBuildOptions as TEnvVariables } from './config/build/types/types'
import { buildWebpack } from './config/build/buildWebpack'
import webpack from 'webpack'
import path from 'path'

export default (env: TEnvVariables) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
        linter: path.resolve(__dirname, '.eslintrc')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port,
        mode: env.mode,
        paths,
        platform: env.platform ?? 'desktop'
    })

    return config
}
