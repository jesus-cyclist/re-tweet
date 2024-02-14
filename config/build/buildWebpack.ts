import { buildDevServer } from './buildDevServer'
import { buildResolvers } from './buildResolvers'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { TBuildOptions } from './types/types'
import webpack from 'webpack'

export function buildWebpack(options: TBuildOptions): webpack.Configuration {
    const { mode, paths } = options
    const isDev = mode === 'development'

    return {
        mode: options.mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: buildDevServer(options)
    }
}
