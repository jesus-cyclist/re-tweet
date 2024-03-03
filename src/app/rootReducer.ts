import { accountReducer, telegramShareReducer } from '@/features'
import { favouritesReducer } from '@/widgets'
import { readReducer } from '@/enteties'
import { combineReducers } from 'redux'
import { dbApi, news } from '@/shared'
import { telegramApi } from '@/pages'

export const rootReducer = combineReducers({
    account: accountReducer,
    favourites: favouritesReducer,
    read: readReducer,
    shareTg: telegramShareReducer,
    [news.reducerPath]: news.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    [telegramApi.reducerPath]: telegramApi.reducer
})
