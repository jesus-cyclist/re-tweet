import { ThemeContext } from '@/app/providers/with-theme'
import Moon from '@/shared/assets/svg/moon.svg'
import Sun from '@/shared/assets/svg/sun.svg'
import s from './theme-handler.module.scss'
import { useContext } from 'react'

export const ThemeHandler = () => {
    const { theme, changeTheme } = useContext(ThemeContext)

    return (
        <div className={s.container}>
            <div className={theme === 'light' ? s.modeSunActive : s.modeSun}>
                <Sun />
            </div>

            <label className={s.switch}>
                <input
                    checked={theme === 'dark'}
                    className={s.checkbox}
                    type='checkbox'
                    onChange={changeTheme}
                />
                <span className={s.slider} />
            </label>

            <div className={theme === 'dark' ? s.modeDarkActive : s.modeDark}>
                <Moon />
            </div>
        </div>
    )
}
