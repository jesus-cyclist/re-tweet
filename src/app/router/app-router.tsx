import { ProtectedRoute } from '@/features/protected-route'
import { Route, Routes } from 'react-router-dom'
import { ClientRoutes } from '@/shared'
import { lazy } from 'react'

const FavoritesPageLazy = lazy(
    () => import('@/pages/favorites/ui/favorites-page')
)
const HistoryPageLazy = lazy(() => import('@/pages/history/ui/history-page'))
const MainPageLazy = lazy(() => import('@/pages/main/ui/main-page'))
const SearchPageLazy = lazy(() => import('@/pages/search/ui/search-page'))
const SighinPageLazy = lazy(() => import('@/pages/signin/ui/signin-page'))
const SignupPageLazy = lazy(() => import('@/pages/signup/ui/signup-page'))

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path={ClientRoutes.MAIN_PATH}
                element={
                    <ProtectedRoute
                        isAuthOnly={true}
                        component={<MainPageLazy />}
                    />
                }
            />
            <Route
                path={ClientRoutes.HISTORY_PATH}
                element={
                    <ProtectedRoute
                        isAuthOnly={true}
                        component={<HistoryPageLazy />}
                    />
                }
            />
            <Route
                path={ClientRoutes.SEARCH_PATH}
                element={
                    <ProtectedRoute
                        isAuthOnly={true}
                        component={<SearchPageLazy />}
                    />
                }
            />
            <Route
                path={ClientRoutes.SIGNIN_PATH}
                element={
                    <ProtectedRoute
                        isAuthOnly={false}
                        component={<SighinPageLazy />}
                    />
                }
            />
            <Route
                path={ClientRoutes.SIGNUP_PATH}
                element={
                    <ProtectedRoute
                        isAuthOnly={false}
                        component={<SignupPageLazy />}
                    />
                }
            />
            <Route
                path={ClientRoutes.FAVORITES_PATH}
                element={
                    <ProtectedRoute
                        isAuthOnly={true}
                        component={<FavoritesPageLazy />}
                    />
                }
            />
            <Route path='*' element={<div>not found</div>} />
        </Routes>
    )
}
