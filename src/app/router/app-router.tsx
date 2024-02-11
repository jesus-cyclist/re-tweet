import { ClientRoutes } from '@/shared'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

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
      <Route path={ClientRoutes.MAIN_PATH} element={<MainPageLazy />} />
      <Route path={ClientRoutes.HISTORY_PATH} element={<HistoryPageLazy />} />
      <Route path={ClientRoutes.SEARCH_PATH} element={<SearchPageLazy />} />
      <Route path={ClientRoutes.SIGNIN_PATH} element={<SighinPageLazy />} />
      <Route path={ClientRoutes.SIGNUP_PATH} element={<SignupPageLazy />} />
      <Route
        path={ClientRoutes.FAVORITES_PATH}
        element={<FavoritesPageLazy />}
      />
      <Route path='*' element={<div>not found</div>} />
    </Routes>
  )
}
