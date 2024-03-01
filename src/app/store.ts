import { configureStore } from '@reduxjs/toolkit'
import { dbApi, spaceFlightApi } from '@/shared'
import { rootReducer } from './rootReducer'
import { telegramApi } from '@/pages'

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(dbApi.middleware)
            .concat(spaceFlightApi.middleware)
            .concat(telegramApi.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
