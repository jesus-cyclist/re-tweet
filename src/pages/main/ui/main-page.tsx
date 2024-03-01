import { selectAccountID } from '@/features/authentication/model/selectors'
import { LayoutUI, dbApi, useAppDispatch, useAppSelector } from '@/shared'
import { Footer, favouritesActions } from '@/widgets'
import { Header } from '@/widgets/header/ui/header'
import { Outlet } from 'react-router-dom'
import { readActions } from '@/enteties'
import { memo, useEffect } from 'react'

const MainPage = memo(() => {
    const userID = useAppSelector(selectAccountID)
    const dispatch = useAppDispatch()
    const { data: favouriteData } = dbApi.useGetFavouritesQuery(userID)
    const { data: readData } = dbApi.useGetReadedQuery(userID)

    useEffect(() => {
        if (favouriteData) {
            dispatch(favouritesActions.setFavourites(favouriteData))
        }
    }, [favouriteData])

    useEffect(() => {
        if (readData) {
            dispatch(readActions.readReceived(readData))
        }
    }, [readData])

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
