import { Content } from 'antd/es/layout/layout'
import { Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { ReactNode } from 'react'
import s from './layout.module.scss'

type TProps = {
    menuItems: MenuProps['items']
    content: ReactNode
}

export const LayoutProfile = (props: TProps) => {
    const { content, menuItems } = props

    return (
        <Layout className={s.layout}>
            <Sider className={s.sider}>
                <Menu
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    items={menuItems}
                />
            </Sider>
            <Content className={s.content}>{content}</Content>
        </Layout>
    )
}
