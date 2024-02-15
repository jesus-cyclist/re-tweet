import { createSlice } from '@reduxjs/toolkit'
import type { TInitialState } from './models'

const initialState: TInitialState = { uid: null, email: null, isAuth: false }

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            const { email, uid } = action.payload
            state.email = email
            state.uid = uid
            state.isAuth = true
        },
        unsetAccount: state => {
            state.email = null
            state.uid = null
            state.isAuth = false
        }
    }
})

export const accountAction = accountSlice.actions
export const accountReducer = accountSlice.reducer