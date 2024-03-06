import { accountReducer, telegramShareReducer } from '@/features'
import { IFrameReducer } from '@/features/iframe-handler/model'
import { favouritesReducer, tweetReducer } from '@/widgets'
import { dbApi, spaceFlightApi } from '@/shared'
import { readReducer } from '@/enteties'
import { combineReducers } from 'redux'
import { telegramApi } from '@/pages'

export const rootReducer = combineReducers({
    account: accountReducer,
    favourites: favouritesReducer,
    tweet: tweetReducer,
    read: readReducer,
    shareTg: telegramShareReducer,
    IFrameReducer: IFrameReducer,
    [spaceFlightApi.reducerPath]: spaceFlightApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    [telegramApi.reducerPath]: telegramApi.reducer
})
