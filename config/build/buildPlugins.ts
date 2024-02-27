import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { TBuildOptions } from './types/types'
import TerserPlugin from 'terser-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import webpack from 'webpack'
import dotenv from 'dotenv'
import path from 'path'

export function buildPlugins(options: TBuildOptions): Configuration['plugins'] {
    const { mode, paths, platform } = options
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    dotenv.config({
        path: path.resolve(paths.base, './.env')
    })

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
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                REACT_APP_FIREBASE_API_KEY:
                    process.env.REACT_APP_FIREBASE_API_KEY,
                REACT_APP_FIREBASE_AUTH_DOMAIN:
                    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                REACT_APP_FIREBASE_PROJECT_ID:
                    process.env.REACT_APP_FIREBASE_PROJECT_ID,
                REACT_APP_FIREBASE_STORAGE_BUCKET:
                    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
                REACT_APP_FIREBASE_MESSAGE_SENDER_ID:
                    process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
                REACT_APP_FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID
            })
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.base, '_redirects'),
                    to: path.resolve(paths.output)
                }
            ]
        })
    ]

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }))
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
