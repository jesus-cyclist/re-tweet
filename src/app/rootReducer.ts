import { dbApi, spaceFlightApi } from '@/shared'
import { favouritesReducer } from '@/widgets'
import { accountReducer } from '@/features'
import { readReducer } from '@/enteties'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    account: accountReducer,
    favourites: favouritesReducer,
    read: readReducer,
    [spaceFlightApi.reducerPath]: spaceFlightApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer
})
