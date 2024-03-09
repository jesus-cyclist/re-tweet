import { createSlice } from '@reduxjs/toolkit'

const initialState: { isAuth: boolean } = {
    isAuth: false
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        onAuth: state => {
            state.isAuth = true
        },
        onUnAuth: state => {
            state.isAuth = false
        }
    }
})

export const { onAuth, onUnAuth } = accountSlice.actions
export const accountReducer = accountSlice.reducer
