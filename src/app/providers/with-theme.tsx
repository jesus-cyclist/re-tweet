import { createContext, useCallback, useMemo } from 'react'
import { AppRouter } from '../router'
import { useTheme } from '@/shared'

export const ThemeContext = createContext(null)

export const WithTheme = () => {
    const [theme, setTheme] = useTheme()

    const handleChangeTheme = useCallback(() => {
        const currentTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(currentTheme)
    }, [theme])

    const contextValue = useMemo(() => {
        return { theme, changeTheme: handleChangeTheme }
    }, [theme, handleChangeTheme])

    return (
        <ThemeContext.Provider value={contextValue}>
            <AppRouter />
        </ThemeContext.Provider>
    )
}
