import { RefObject, useEffect } from 'react'

type TUseClickOutSide = {
    ref: RefObject<HTMLElement>
    cb: (e: Event) => void
}

export const useClickOutSide = ({ ref, cb }: TUseClickOutSide) => {
    const handleCLick = (e: Event) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            cb(e)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleCLick)

        return () => {
            document.removeEventListener('click', handleCLick)
        }
    }, [])
}
