import { useState, useEffect } from 'react'

export const useIframeState = () => {
    const initialIframeState = localStorage.getItem('iframeState')

    const [isIframeEnabled, setIsIframeEnabled] = useState(
        initialIframeState === 'true'
    )

    const toggleIframe = () => {
        setIsIframeEnabled(prevState => {
            const newState = !prevState

            localStorage.setItem('iframeState', String(newState))
            return newState
        })
    }

    useEffect(() => {
        const storedIframeState = localStorage.getItem('iframeState')
        if (storedIframeState !== null) {
            setIsIframeEnabled(storedIframeState === 'true')
        }
    }, [])

    return { isIframeEnabled, toggleIframe }
}
