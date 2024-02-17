import { accountReducer } from '@/features'
import { spaceFlightApi } from '@/shared'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    account: accountReducer,
    [spaceFlightApi.reducerPath]: spaceFlightApi.reducer
})
