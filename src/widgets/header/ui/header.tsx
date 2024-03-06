import { HeaderMenu, SearchPanel } from '@/features'
import s from './header.module.scss'
import React from 'react'

export const Header = React.memo(() => {
    return (
        <div className={s.header}>
            <HeaderMenu />
            <SearchPanel />
        </div>
    )
})

Header.displayName = 'Header'
