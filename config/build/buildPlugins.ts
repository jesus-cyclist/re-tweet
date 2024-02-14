import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { TBuildOptions } from './types/types'
import TerserPlugin from 'terser-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import path from 'path'

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

        new ForkTsCheckerWebpackPlugin(),
        new Dotenv()
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
        plugins.push(new TerserPlugin())
    }

    return plugins
}
