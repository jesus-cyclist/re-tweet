import { ThemeContext } from '@/app/providers/with-theme'
import Moon from '@/shared/assets/svg/moon.svg'
import Sun from '@/shared/assets/svg/sun.svg'
import s from './theme-handler.module.scss'
import { useContext, useRef } from 'react'

export const ThemeHandler = () => {
    const { isThemeDark, changeTheme } = useContext(ThemeContext)

    const moonRef = useRef(null)
    const sunRef = useRef(null)

    return (
        <div className={s.container}>
            <div
                className={isThemeDark ? s.modeSun : s.modeSunActive}
                ref={sunRef}
            >
                <Sun />
            </div>

            <label className={s.switch}>
                <input
                    className={s.checkbox}
                    type='checkbox'
                    onChange={changeTheme}
                />
                <span className={s.slider} />
            </label>

            <div
                className={isThemeDark ? s.modeDarkActive : s.modeDark}
                ref={moonRef}
            >
                <Moon />
            </div>
        </div>
    )
}
