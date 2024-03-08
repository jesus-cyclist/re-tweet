import { IFrameReducer, accountReducer } from '@/features'
import { dbApi, spaceFlightApi } from '@/shared'
import { statisticsReducer } from '@/widgets'
import { combineReducers } from 'redux'
import { telegramApi } from '@/pages'

export const rootReducer = combineReducers({
    account: accountReducer,
    statistics: statisticsReducer,
    IFrameReducer: IFrameReducer,
    [spaceFlightApi.reducerPath]: spaceFlightApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    [telegramApi.reducerPath]: telegramApi.reducer
})
