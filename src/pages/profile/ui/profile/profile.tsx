import { NavLink, Outlet } from 'react-router-dom'
import { LayoutProfile } from '../layout/layout'
import { ClientRoutes } from '@/shared'
import { MenuProps } from 'antd'

const menuItems: MenuProps['items'] = [
    {
        label: (
            <NavLink to={ClientRoutes.PROFILE_PATH_EDIT}>Edit profile</NavLink>
        ),
        key: 'setting:1'
    },
    {
        label: (
            <NavLink to={ClientRoutes.PROFILE_PATH_SETTINGS}>In future</NavLink>
        ),
        key: 'setting:2'
    }
]

const Profile = () => {
    return <LayoutProfile menuItems={menuItems} content={<Outlet />} />
}

export default Profile
