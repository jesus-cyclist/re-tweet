import { type TBuildOptions } from './types/types'

export function buildResolvers(options: TBuildOptions) {
    return {
        extensions: ['.tsx', '.ts', '.js'], //расширения для файлов, чтобы не писать его при импортах,
        alias: {
            '@': options.paths.src
        }
    }
}
