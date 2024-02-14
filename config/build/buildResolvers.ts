import { type TBuildOptions } from './types/types'

export function buildResolvers(options: TBuildOptions) {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src
        }
    }
}
