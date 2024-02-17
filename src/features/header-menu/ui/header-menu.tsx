import { SettingOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import s from './header-menu.module.scss'
import { ClientRoutes } from '@/shared'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import { Menu } from 'antd'

const items: MenuProps['items'] = [
    {
        label: 'Menu',
        key: 'News',
        icon: <SettingOutlined />,
        children: [
            {
                label: <NavLink to={ClientRoutes.CURRENTS_NEWS}>News</NavLink>,
                key: 'setting:1'
            },
            {
                label: <NavLink to={ClientRoutes.SEARCH_PATH}>Search</NavLink>,
                key: 'setting:2'
            }
        ]
    },
    {
        label: <NavLink to={ClientRoutes.TWEET}>Tweet</NavLink>,
        key: 'tweet'
    }
]

export const HeaderMenu = () => {
    const [current, setCurrent] = useState('mail')

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key)
    }

    return (
        <Menu
            style={{ background: 'var(--secondary-color)' }}
            className={s.menu}
            onClick={onClick}
            selectedKeys={[current]}
            mode='horizontal'
            items={items}
        />
    )
}
