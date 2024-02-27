import type { StorybookConfig } from '@storybook/react-webpack5'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import path from 'path'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        '@storybook/preset-scss',
        '@storybook/addon-styling-webpack'
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {
            builder: {
                useSWC: true
            }
        }
    },
    docs: {
        autodocs: 'tag'
    },

    webpackFinal: async (config: any, { configType }) => {
        config.resolve.modules = [...(config.resolve.modules || []), './src']

        const fileLoaderRule = config.module.rules.find(
            rule => rule.test && rule.test.test('.svg')
        )

        fileLoaderRule.exclude = /\.svg$/

        config.module.rules.push(
            {
                test: /\.svg$/,
                enforce: 'pre',
                loader: require.resolve('@svgr/webpack')
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        )

        config.plugins.push(
            new TsconfigPathsPlugin({
                extensions: config.resolve.extensions
            })
        )

        return config
    }
}
export default config
