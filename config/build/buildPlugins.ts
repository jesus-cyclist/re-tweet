import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration, DefinePlugin } from 'webpack'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import type { TBuildOptions } from './types/types'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

export function buildPlugins(options: TBuildOptions): Configuration['plugins'] {
    const { mode, paths, platform } = options
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode)
        }),
        /** Выносит проверку типов в отдельный процесс: не нагружая сборку */
        new ForkTsCheckerWebpackPlugin()
    ]

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin())
        plugins.push(new ESLintPlugin())
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        )
        // plugins.push(new BundleAnalyzerPlugin()) //размер чанок
        plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(paths.public, 'locales'),
                        to: path.resolve(paths.output, 'locales')
                    }
                ]
            })
        )
        plugins.push(new TerserPlugin()) //удаление комментариев
    }

    return plugins
}
