import { selectAccountIsAuth } from '@/features/authentication/model/selectors'
import { ClientRoutes, dbApi, useAppDispatch, useAppSelector } from '@/shared'
import { accountAction } from '@/features/authentication'
import { ThemeHandler } from '@/features/theme-handler'
import { memo, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import s from './header-menu.module.scss'
import type { MenuProps } from 'antd'
import { Logo } from '../logo'
import { Menu } from 'antd'

export const HeaderMenu = memo(() => {
    const isAuth = useAppSelector(selectAccountIsAuth)
    const [current, setCurrent] = useState('mail')
    const dispatch = useAppDispatch()
    const [fetch] = dbApi.useLazyGetSignOutQuery()

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key)
    }

    const handleSignOut = () => {
        fetch().then(() => dispatch(accountAction.unsetAccount()))
    }

    const items: MenuProps['items'] = useMemo(() => {
        const children = [
            {
                label: <NavLink to={ClientRoutes.MAIN_PATH}>Home</NavLink>,
                key: 'setting:0'
            },
            {
                label: <NavLink to={ClientRoutes.NEWS}>News</NavLink>,
                key: 'setting:1'
            },

            {
                label: <NavLink to={ClientRoutes.TWEET}>Tweet</NavLink>,
                key: 'setting:4'
            },
            {
                label: <div>Settings</div>,
                key: 'settings:5',
                children: [
                    {
                        label: (
                            <div
                                style={{ height: '100%' }}
                                onClick={e => {
                                    e.stopPropagation()
                                    return
                                }}
                            >
                                <ThemeHandler />
                            </div>
                        ),
                        key: 'setting:6'
                    }
                ]
            }
        ]

        if (isAuth) {
            const authContent = [
                {
                    label: (
                        <NavLink to={ClientRoutes.FAVORITES_PATH}>
                            Favourites
                        </NavLink>
                    ),
                    key: 'setting:2'
                },
                {
                    label: (
                        <NavLink to={ClientRoutes.SEARCH_HISTORY_PATH}>
                            Search history
                        </NavLink>
                    ),
                    key: 'setting:3'
                },
                {
                    label: <div onClick={handleSignOut}>Exit</div>,
                    key: 'setting:8'
                }
            ]
            children.push(...authContent)
        }

        if (!isAuth) {
            children.push({
                label: <NavLink to={ClientRoutes.SIGNIN_PATH}>Sign in</NavLink>,
                key: 'setting:10'
            })
        }

        return [
            {
                label: <Logo />,
                key: 'News',
                children
            }
        ]
    }, [isAuth])

    return (
        <Menu
            style={{
                background: 'var(--accent-color)',
                padding: 0
            }}
            className={s.menu}
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={items}
        />
    )
})

HeaderMenu.displayName = 'HeaderMenu'
