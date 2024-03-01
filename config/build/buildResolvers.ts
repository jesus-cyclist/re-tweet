import { type TBuildOptions } from './types/types'
import { Configuration } from 'webpack'

export function buildResolvers(
    options: TBuildOptions
): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src
        }
        // fallback: { crypto: false }
    }
}
