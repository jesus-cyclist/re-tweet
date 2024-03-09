import { useEffect, useRef } from 'react'

type TUseDebounce<T> = {
    callback: (...args: T[]) => void
    delay: number
}

export const useDebounce = <T>({ callback, delay }: TUseDebounce<T>) => {
    const timeoutRef = useRef(null)

    useEffect(() => {
        //сайд эффект при монтировании
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [])

    const debouncedCallback = (...args: T[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }

    return debouncedCallback
}
