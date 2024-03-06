import { consoleMiddleware, dbApi, spaceFlightApi } from '@/shared'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { telegramApi } from '@/pages'
import { logger } from '@/features'

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(dbApi.middleware)
            .concat(spaceFlightApi.middleware)
            .concat(telegramApi.middleware)
            .concat(logger)
            .prepend(consoleMiddleware.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
