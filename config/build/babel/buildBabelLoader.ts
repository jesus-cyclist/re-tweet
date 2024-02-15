import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin'
import { type TBuildOptions } from '../types/types'

export function buildBabelLoader({ mode }: TBuildOptions) {
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins = []

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid']
            }
        ])
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    [
                        '@babel/preset-react',
                        {
                            runtime: isDev ? 'automatic' : 'classic'
                        }
                    ]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}
