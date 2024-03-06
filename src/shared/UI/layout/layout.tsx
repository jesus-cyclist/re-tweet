import s from './layout.module.scss'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

type Props = {
    header: ReactNode
    content: ReactNode
    footer: ReactNode
}

export const LayoutUI = (props: Props): JSX.Element => {
    const { header, content, footer } = props
    return (
        <Layout className={s.layout}>
            <Header className={s.header}>{header}</Header>
            <Content className={s.content}>{content}</Content>
            <Footer className={s.footer}>{footer}</Footer>
        </Layout>
    )
}

LayoutUI.propsTypes = {
    header: PropTypes.element.isRequired,
    content: PropTypes.element.isRequired,
    footer: PropTypes.element.isRequired
}
