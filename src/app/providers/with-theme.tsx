import { createContext, useCallback, useMemo, useState } from 'react'
import { AppRouter } from '../router'

export const ThemeContext = createContext(null)

export const WithTheme = () => {
    const [isThemeDark, setIsThemeDark] = useState<boolean>(false)

    const handleChangeTheme = useCallback(
        () => setIsThemeDark(prev => !prev),
        [setIsThemeDark]
    )

    const contextValue = useMemo(() => {
        return { isThemeDark, changeTheme: handleChangeTheme }
    }, [isThemeDark, handleChangeTheme])

    return (
        <ThemeContext.Provider value={contextValue}>
            <AppRouter />
        </ThemeContext.Provider>
    )
}
