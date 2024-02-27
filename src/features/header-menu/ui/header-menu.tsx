import { SettingOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import s from './header-menu.module.scss'
import { ClientRoutes } from '@/shared'
import { memo, useState } from 'react'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'

const items: MenuProps['items'] = [
    {
        label: 'Menu',
        key: 'News',
        icon: <SettingOutlined />,
        children: [
            {
                label: <NavLink to={ClientRoutes.MAIN_PATH}>Home</NavLink>,
                key: 'setting:1'
            },
            {
                label: <NavLink to={ClientRoutes.NEWS}>News</NavLink>,
                key: 'setting:2'
            },
            {
                label: (
                    <NavLink to={ClientRoutes.FAVORITES_PATH}>
                        Favourites
                    </NavLink>
                ),
                key: 'setting:3'
            },
            {
                label: (
                    <NavLink to={ClientRoutes.SEARCH_HISTORY_PATH}>
                        Search history
                    </NavLink>
                ),
                key: 'setting:4'
            },
            {
                label: (
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                    >
                        Exit
                    </Button>
                ),
                key: 'setting:5'
            }
        ]
    },
    {
        label: <NavLink to={ClientRoutes.TWEET}>Tweet</NavLink>,
        key: 'tweet'
    }
]

export const HeaderMenu = memo(() => {
    const [current, setCurrent] = useState('mail')

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key)
    }
    console.log('render header-menu')
    return (
        <Menu
            style={{ background: 'var(--accent-color)' }}
            className={s.menu}
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={items}
        />
    )
})

HeaderMenu.displayName = 'HeaderMenu'
