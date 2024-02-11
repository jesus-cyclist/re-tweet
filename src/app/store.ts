import { configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { rootReducer } from './rootReducer'

const store = configureStore({
  reducer: { rootReducer },
})

export default store

declare type RootState = ReturnType<typeof store.getState>
declare type AppDispatch = typeof store.dispatch
