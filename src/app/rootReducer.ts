import { accountReducer, telegramShareReducer } from '@/features'
import { dbApi, spaceFlightApi } from '@/shared'
import { favouritesReducer } from '@/widgets'
import { readReducer } from '@/enteties'
import { combineReducers } from 'redux'
import { telegramApi } from '@/pages'

export const rootReducer = combineReducers({
    account: accountReducer,
    favourites: favouritesReducer,
    read: readReducer,
    shareTg: telegramShareReducer,
    [spaceFlightApi.reducerPath]: spaceFlightApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    [telegramApi.reducerPath]: telegramApi.reducer
})
