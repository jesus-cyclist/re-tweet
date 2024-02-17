import { useEffect, useState } from 'react'

type TDebounce<T> = {
    cb: () => void
    delay: number
    dependencies: T[]
}

export const useDebounce = <T>({ cb, delay, dependencies }: TDebounce<T>) => {
    const [timeoutId, setTimeoutId] = useState(null)

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            setTimeoutId(null)
        }

        const id = setTimeout(() => {
            cb()
        }, delay)
        setTimeoutId(id)

        return () => {
            clearTimeout(timeoutId)
            setTimeoutId(null)
        }
    }, dependencies)
}
