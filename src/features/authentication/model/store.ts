import { createSlice } from '@reduxjs/toolkit'

const initialState: { isAuth: boolean } = {
    isAuth: false
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setIsAuth: state => {
            state.isAuth = true
        },
        setIsUnAuth: state => {
            state.isAuth = false
        }
    }
})

export const accountAction = accountSlice.actions
export const accountReducer = accountSlice.reducer
