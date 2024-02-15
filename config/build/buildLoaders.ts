import { buildBabelLoader } from './babel/buildBabelLoader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { TBuildOptions } from './types/types'
import { ModuleOptions } from 'webpack'

export function buildLoaders(options: TBuildOptions): ModuleOptions['rules'] {
    const { mode } = options
    const isDev = mode === 'development'

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    }

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev
                    ? '[path][name]__[local]'
                    : '[hash:base64:8]'
            }
        }
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            'sass-loader'
        ]
    }

    const babelLoader = buildBabelLoader(options)

    return [assetLoader, scssLoader, svgrLoader, babelLoader]
}
