import {
    FirebaseFavourites,
    LayoutUI,
    TFavourite,
    useAppDispatch,
    useAppSelector
} from '@/shared'
import { selectAccountID } from '@/features/authentication/model/selectors'
import { Footer, favouritesActions } from '@/widgets'
import { Header } from '@/widgets/header/ui/header'
import { Outlet } from 'react-router-dom'
import { memo, useEffect } from 'react'

const MainPage = memo(() => {
    const userID = useAppSelector(selectAccountID)
    const dispatch = useAppDispatch()
    useEffect(() => {
        FirebaseFavourites.getFavourites(userID).then(
            (res: Array<TFavourite>) => {
                dispatch(favouritesActions.setFavourites(res))
            }
        )
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
