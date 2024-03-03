import { useLayoutEffect, useState } from 'react'

type ThemeHook = [string, (color: string) => void]

export const useTheme = (): ThemeHook => {
    const [theme, setTheme] = useState(
        localStorage.getItem('app-settings-theme') || 'light'
    )

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-settings-theme', theme)
    }, [theme])

    return [theme, setTheme]
}
