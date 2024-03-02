import { HeaderMenu, Logo, SearchPanel } from '@/features'
import s from './header.module.scss'

export const Header = () => {
    return (
        <div className={s.header}>
            <HeaderMenu />
            <Logo />
            <SearchPanel />
        </div>
    )
}
