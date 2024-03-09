import { ClientRoutes, useAppSelector, useGetSignOutMutation } from '@/shared'
import { onUnAuth, selectAccountIsAuth } from '@/features/authentication'
import { IFrameHandler } from '@/features/iframe-handler'
import { ThemeHandler } from '@/features/theme-handler'
import { memo, useMemo, useState } from 'react'
import { statisticsActions } from '@/widgets'
import { NavLink } from 'react-router-dom'
import s from './header-menu.module.scss'
import { useDispatch } from 'react-redux'
import type { MenuProps } from 'antd'
import { Logo } from '../logo'
import { Menu } from 'antd'

export const HeaderMenu = memo(() => {
    const isAuth = useAppSelector(selectAccountIsAuth)
    const [current, setCurrent] = useState('mail')
    const [fetchSignOut] = useGetSignOutMutation()
    const dispatch = useDispatch()

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key)
    }

    const handleSignOut = () => {
        fetchSignOut().then(() => {
            dispatch(onUnAuth())
            dispatch(statisticsActions.clearRead())
        })
    }

    const items: MenuProps['items'] = useMemo(() => {
        const children = [
            {
                label: <NavLink to={ClientRoutes.MAIN_PATH}>Home</NavLink>,
                key: 'setting:1'
            },

            {
                label: <NavLink to={ClientRoutes.TWEETS_PATH}>Tweets</NavLink>,
                key: 'setting:2'
            },
            {
                label: 'Settings',
                key: 'settings:3',
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
                        key: 'setting:4'
                    },
                    {
                        label: (
                            <div
                                style={{ height: '100%' }}
                                onClick={e => {
                                    e.stopPropagation()
                                    return
                                }}
                            >
                                <IFrameHandler />
                            </div>
                        ),
                        key: 'setting:5'
                    }
                ]
            }
        ]

        if (isAuth) {
            const authContent = [
                {
                    label: 'Profile',
                    key: 'settings:6',
                    children: [
                        {
                            label: (
                                <NavLink to={ClientRoutes.FAVORITES_PATH}>
                                    Favourites news
                                </NavLink>
                            ),
                            key: 'setting:7'
                        },
                        {
                            label: (
                                <NavLink to={ClientRoutes.SEARCH_HISTORY_PATH}>
                                    Search history
                                </NavLink>
                            ),
                            key: 'setting:8'
                        },
                        {
                            label: (
                                <NavLink to={ClientRoutes.PROFILE_PATH}>
                                    Profile edit
                                </NavLink>
                            ),
                            key: 'setting:11'
                        }
                    ]
                },
                {
                    label: <div onClick={handleSignOut}>Exit</div>,
                    key: 'setting:9'
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
