import {
    LayoutUI,
    useAppDispatch,
    useAppSelector,
    useIframeState,
    useLazyGetFavouritesQuery,
    useLazyGetReadedQuery
} from '@/shared'
import { selectAccountID } from '@/features/authentication/model/selectors'
import { IFrameAction } from '@/features/iframe-handler/model'
import { Footer, favouritesActions } from '@/widgets'
import { Header } from '@/widgets/header/ui/header'
import { telegramShareActions } from '@/features'
import { useGetTgSharedQuery } from '../api'
import { Outlet } from 'react-router-dom'
import { readActions } from '@/enteties'
import { memo, useEffect } from 'react'

const MainPage = memo(() => {
    const { isIframeEnabled } = useIframeState()
    const userID = useAppSelector(selectAccountID)
    const dispatch = useAppDispatch()
    const [fetchFavourites, { data: favouriteData }] =
        useLazyGetFavouritesQuery()
    const [fetchReaded, { data: readData }] = useLazyGetReadedQuery()
    const { data } = useGetTgSharedQuery()

    useEffect(() => {
        if (userID) {
            fetchFavourites(userID)
            fetchReaded(userID)
        }
    }, [userID])

    useEffect(() => {
        if (favouriteData) {
            dispatch(favouritesActions.setFavourites(favouriteData))
        }
    }, [favouriteData])

    useEffect(() => {
        if (readData && userID) {
            dispatch(readActions.readReceived(readData))
        }
    }, [readData, userID])

    useEffect(() => {
        if (data) {
            dispatch(telegramShareActions.setShare(data.isTelegramShareEnabled))
        }
    }, [data])

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
