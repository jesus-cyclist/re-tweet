import { configureStore } from '@reduxjs/toolkit'
// import { Middleware } from 'redux'
import { rootReducer } from './rootReducer'

const store = configureStore({
    reducer: { rootReducer }
})

export default store

// eslint-disable-next-line
declare type RootState = ReturnType<typeof store.getState>
// eslint-disable-next-line
declare type AppDispatch = typeof store.dispatch
