import { Header } from '@/widgets/header/ui/header'
import { Outlet } from 'react-router-dom'
import { LayoutUI } from '@/shared'
import { Footer } from '@/widgets'
import { memo } from 'react'

const MainPage = memo(() => {
    return (
        <LayoutUI
            header={<Header />}
            content={<Outlet />}
            footer={<Footer />}
        />
    )
})

export default MainPage

MainPage.displayName = 'MainPage'
