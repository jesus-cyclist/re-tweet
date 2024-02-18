import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { spaceFlightApi } from '@/shared'

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(spaceFlightApi.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
