import { createSlice } from '@reduxjs/toolkit'
import type { TInitialState } from './models'
import { TAuthUser } from '@/shared'

const initialState: TInitialState = {
    uid: null,
    email: null,
    isAuth: false,
    displayName: null,
    photoURL: null
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            const { email, uid, displayName, photoURL } =
                action.payload as TAuthUser

            state.email = email
            state.uid = uid
            state.isAuth = true
            state.displayName = displayName
            state.photoURL = photoURL
        },
        unsetAccount: state => {
            state.email = null
            state.uid = null
            state.isAuth = false
            state.displayName = null
            state.photoURL = null
        }
    }
})

export const accountAction = accountSlice.actions
export const accountReducer = accountSlice.reducer
