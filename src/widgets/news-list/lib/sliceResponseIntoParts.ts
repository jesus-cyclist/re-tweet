import type { TNews } from '@/shared'

export const sliceResponseIntoParts = (response: Array<TNews>) => {
    const part_first = response.slice(0, 3)
    const part_sec = response.slice(3, 6)
    const part_third = response.slice(6)

    return [part_first, part_sec, part_third]
}
