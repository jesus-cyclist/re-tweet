import { Route, Routes, useLocation } from 'react-router-dom'
import { ProtectedRoute } from '@/features/protected-route'
import { ClientRoutes, ModalUI } from '@/shared'
import { lazy } from 'react'

const FavoritesPageLazy = lazy(
    () => import('@/pages/favorites/ui/favorites-page')
)
const MainPageLazy = lazy(() => import('@/pages/main/ui/main-page'))
const SearchPageLazy = lazy(() => import('@/pages/search/ui/search-page'))
const SearchHistoryPageLazy = lazy(
    () => import('@/pages/search-history/ui/search-history')
)
const SighinPageLazy = lazy(() => import('@/pages/signin/ui/signin-page'))
const SignupPageLazy = lazy(() => import('@/pages/signup/ui/signup-page'))
const NewsPageLazy = lazy(() => import('@/pages/news/ui/news-page'))
const NewsInfoPageLazy = lazy(() => import('@/pages/news-info/ui/news-info'))

export const AppRouter = () => {
    const location = useLocation()
    const state = location.state

    return (
        <>
            <Routes location={state?.news || location}>
                <Route
                    path={ClientRoutes.MAIN_PATH}
                    element={
                        <ProtectedRoute
                            isAuthOnly={true}
                            component={<MainPageLazy />}
                        />
                    }
                >
                    <Route
                        path={ClientRoutes.NEWS}
                        element={
                            <ProtectedRoute
                                isAuthOnly={true}
                                component={<NewsPageLazy />}
                            />
                        }
                    />
                    <Route
                        path={`${ClientRoutes.NEWS}:id`}
                        element={
                            <ProtectedRoute
                                isAuthOnly={true}
                                component={<NewsInfoPageLazy />}
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
                        path={ClientRoutes.SEARCH_HISTORY_PATH}
                        element={
                            <ProtectedRoute
                                isAuthOnly={true}
                                component={<SearchHistoryPageLazy />}
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
                    <Route
                        path={ClientRoutes.SEARCH_PATH}
                        element={
                            <ProtectedRoute
                                isAuthOnly={true}
                                component={<SearchPageLazy />}
                            />
                        }
                    />
                </Route>
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

                <Route path='*' element={<div>not found</div>} />
            </Routes>
            {state?.news && (
                <Routes>
                    <Route
                        path={`${ClientRoutes.NEWS}:id`}
                        element={
                            <ProtectedRoute
                                isAuthOnly={true}
                                component={
                                    <ModalUI>
                                        <NewsInfoPageLazy />
                                    </ModalUI>
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </>
    )
}
