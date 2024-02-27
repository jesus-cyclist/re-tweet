import { useCallback, useState } from 'react'

export const useAsyncError = <T>() => {
    const [, setError] = useState()
    return useCallback(
        (e: T) => {
            setError(() => {
                throw e
            })
        },
        [setError]
    )
}
