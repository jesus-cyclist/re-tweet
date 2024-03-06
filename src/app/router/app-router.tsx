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
const ForbidenPageLazy = lazy(() => import('@/pages/404/ui/404'))
const TweetCreatePageLazy = lazy(
    () => import('@/pages/tweet-create/ui/tweet-create')
)
const TweetsPageLazy = lazy(() => import('@/pages/tweets/ui/tweets'))
const NewsFramePageLazy = lazy(
    () => import('@/pages/news-info-frame/ui/news-info-frame')
)
const ProfilePageLazy = lazy(() => import('@/pages/profile/ui/profile/profile'))
const ProfileEditPageLazy = lazy(
    () => import('@/pages/profile-edit/ui/profile-edit')
)

export const AppRouter = () => {
    const location = useLocation()

    return (
        <>
            <Routes
                location={
                    location.state?.news || location.state?.tweet || location
                }
            >
                <Route path={ClientRoutes.MAIN_PATH} element={<MainPageLazy />}>
                    <Route
                        path={ClientRoutes.MAIN_PATH}
                        element={<NewsPageLazy />}
                    />
                    <Route
                        path={`${ClientRoutes.NEWS_PATH}:id`}
                        element={<NewsInfoPageLazy />}
                    />
                    <Route
                        path={ClientRoutes.SEARCH_PATH}
                        element={<SearchPageLazy />}
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
                        element={<SearchPageLazy />}
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
                        path={ClientRoutes.TWEETS_PATH}
                        element={<TweetsPageLazy />}
                    />
                    <Route
                        path={`${ClientRoutes.NEWS_FRAME_PATH}:id`}
                        element={<NewsFramePageLazy />}
                    />

                    <Route
                        path={ClientRoutes.PROFILE_PATH}
                        element={
                            <ProtectedRoute
                                isAuthOnly={true}
                                component={<ProfilePageLazy />}
                            />
                        }
                    >
                        <Route
                            path={ClientRoutes.PROFILE_PATH_EDIT}
                            element={
                                <ProtectedRoute
                                    isAuthOnly={true}
                                    component={<ProfileEditPageLazy />}
                                />
                            }
                        ></Route>
                    </Route>

                    <Route
                        path={`${ClientRoutes.TWEET_CREATE_PATH}:id`}
                        element={<TweetCreatePageLazy />}
                    />
                    <Route path='*' element={<ForbidenPageLazy />} />
                </Route>
            </Routes>
            {location.state?.news && (
                <Routes>
                    <Route
                        path={`${ClientRoutes.NEWS_PATH}:id`}
                        element={
                            <ModalUI>
                                <NewsInfoPageLazy />
                            </ModalUI>
                        }
                    />
                </Routes>
            )}
            {location.state?.tweet && (
                <Routes>
                    <Route
                        path={`${ClientRoutes.TWEET_CREATE_PATH}:id`}
                        element={
                            <ModalUI>
                                <TweetCreatePageLazy />
                            </ModalUI>
                        }
                    />
                </Routes>
            )}
        </>
    )
}
