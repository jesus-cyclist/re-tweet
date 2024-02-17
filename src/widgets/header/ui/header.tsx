import { RocketOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { HeaderMenu } from '@/features'
import { ClientRoutes } from '@/shared'
import s from './header.module.scss'
import { Button } from 'antd'

export const Header = () => {
    return (
        <div className={s.header}>
            <NavLink to={ClientRoutes.MAIN_PATH}>
                <RocketOutlined />
            </NavLink>
            <HeaderMenu />
            <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
            >
                Exit
            </Button>
        </div>
    )
}
