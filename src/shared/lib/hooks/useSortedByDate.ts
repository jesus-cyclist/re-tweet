import { useMemo } from 'react'

export const useSortedByDate = <T extends { timestamp: string }>(
    list: Array<T>,
    isSorted: boolean
) => {
    const sortedList = useMemo(() => {
        return [...list].sort((a, b) => {
            if (isSorted) {
                return a.timestamp.localeCompare(b.timestamp)
            }
            return b.timestamp.localeCompare(a.timestamp)
        })
    }, [list, isSorted])

    return sortedList
}
