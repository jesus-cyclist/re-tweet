import { favouritesReducer } from '@/widgets'
import { accountReducer } from '@/features'
import { spaceFlightApi } from '@/shared'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    account: accountReducer,
    favourites: favouritesReducer,
    [spaceFlightApi.reducerPath]: spaceFlightApi.reducer
})
