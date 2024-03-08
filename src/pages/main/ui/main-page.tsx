import { LayoutUI, useAppDispatch, useIframeState } from '@/shared'
import { IFrameAction } from '@/features/iframe-handler/model'
import { Header } from '@/widgets/header/ui/header'
import { Outlet } from 'react-router-dom'
import { memo, useEffect } from 'react'
import { Footer } from '@/widgets'

const MainPage = memo(() => {
    const { isIframeEnabled } = useIframeState()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(IFrameAction.setIFrame(isIframeEnabled))
    }, [])

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
