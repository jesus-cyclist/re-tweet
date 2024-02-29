import { dbApi, spaceFlightApi } from '@/shared'
import { favouritesReducer } from '@/widgets'
import { accountReducer } from '@/features'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    account: accountReducer,
    favourites: favouritesReducer,
    [spaceFlightApi.reducerPath]: spaceFlightApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer
})
