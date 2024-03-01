import { HeaderMenu, Logo, SearchPanel, ThemeHandler } from '@/features'
import s from './header.module.scss'

export const Header = () => {
    return (
        <div className={s.header}>
            <Logo />
            <HeaderMenu />
            <ThemeHandler />
            <SearchPanel />
        </div>
    )
}
