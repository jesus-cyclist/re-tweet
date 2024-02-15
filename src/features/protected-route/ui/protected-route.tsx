import { authSelectors } from '@/features/authentication'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/shared/lib'
import { ClientRoutes } from '@/shared'
import { ReactNode } from 'react'

type TProtectedRouteProps = {
    component: ReactNode
    isAuthOnly: boolean
}

export const ProtectedRoute = (props: TProtectedRouteProps): JSX.Element => {
    const { component, isAuthOnly } = props
    const isAuth = useAppSelector(authSelectors.selectAccountIsAuth)
    const location = useLocation()

    if (isAuthOnly && !isAuth) {
        return (
            <Navigate
                to={ClientRoutes.SIGNIN_PATH}
                state={{ from: location }}
                replace
            />
        )
    }

    if (!isAuthOnly && isAuth) {
        return <Navigate to={ClientRoutes.MAIN_PATH} replace />
    }

    return component as JSX.Element
}