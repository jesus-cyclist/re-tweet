import { onFrameToggled } from '@/features'
import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/shared'

export const useIframeState = () => {
    const dispatch = useAppDispatch()
    const initialIframeState = localStorage.getItem('iframeState')

    const [isIframeEnabled, setIsIframeEnabled] = useState(
        initialIframeState === 'true'
    )

    const onToggleFrame = () => {
        setIsIframeEnabled(prevState => {
            const newState = !prevState
            dispatch(onFrameToggled(newState))
            localStorage.setItem('iframeState', String(newState))
            return newState
        })
    }

    useEffect(() => {
        //сайд эффект при монтировании
        const storedIframeState = localStorage.getItem('iframeState')
        if (storedIframeState !== null) {
            setIsIframeEnabled(storedIframeState === 'true')
        }
    }, [])

    return { isIframeEnabled, onToggleFrame }
}
