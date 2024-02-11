import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import ReactRefreshTypeScript from 'react-refresh-typescript'
import { ModuleOptions } from 'webpack'
import { buildBabelLoader } from './babel/buildBabelLoader'
import type { TBuildOptions } from './types/types'

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
                                name: 'convertColors', //для применения иконкой цвета через color
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
        //ПОРЯДОК!!! на выходе с лоадеров мы получчаем обработанные файлы
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            'sass-loader'
        ]
    }

    // const tsLoader = {
    //   // ts-loader умеет работать с JSX
    //   // Если б мы не использовали тайпскрипт: нужен был бы babel-loader
    //   exclude: /node_modules/,
    //   test: /\.tsx?$/,
    //   use: [
    //     {
    //       loader: 'ts-loader',
    //       options: {
    //         transpileOnly: true,
    //         getCustomTransformers: () => ({
    //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    //         }),
    //       },
    //     },
    //   ],
    // }

    const babelLoader = buildBabelLoader(options)

    return [
        assetLoader,
        scssLoader,
        // tsLoader,
        svgrLoader,
        babelLoader
    ]
}
