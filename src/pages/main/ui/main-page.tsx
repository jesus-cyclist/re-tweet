import { Header } from '@/widgets/header/ui/header'
import { Outlet } from 'react-router-dom'
import { LayoutUI } from '@/shared'

const MainPage = () => {
    return (
        <LayoutUI
            header={<Header />}
            content={<Outlet />}
            footer={<h1>footer</h1>}
        />
    )
}
export default MainPage
