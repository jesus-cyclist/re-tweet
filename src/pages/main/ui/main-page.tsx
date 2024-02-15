import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { accountAction, authSelectors } from '@/features'
import { NavLink } from 'react-router-dom'
import { FirebaseAuth } from '@/shared'

const MainPage = () => {
    const isAuth = useAppSelector(authSelectors.selectAccountIsAuth)
    const dispatch = useAppDispatch()

    return (
        <>
            <NavLink to={'/signin'}>ITS MAIN PAGE. GO TO SIGNIN</NavLink>
            <button
                onClick={() => {
                    FirebaseAuth.signOut()
                    dispatch(accountAction.unsetAccount())
                }}
            >
                {isAuth ? 'выйти' : 'зайти'}
            </button>
        </>
    )
}
export default MainPage
