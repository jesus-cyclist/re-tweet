import { selectAccountID } from '@/features/authentication/model/selectors'
import { LayoutUI, dbApi, useAppDispatch, useAppSelector } from '@/shared'
import { Footer, favouritesActions } from '@/widgets'
import { Header } from '@/widgets/header/ui/header'
import { Outlet } from 'react-router-dom'
import { memo, useEffect } from 'react'

const MainPage = memo(() => {
    const userID = useAppSelector(selectAccountID)
    const dispatch = useAppDispatch()
    const { data } = dbApi.useGetFavouritesQuery(userID)

    useEffect(() => {
        if (data) {
            dispatch(favouritesActions.setFavourites(data))
        }
    }, [data])

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
