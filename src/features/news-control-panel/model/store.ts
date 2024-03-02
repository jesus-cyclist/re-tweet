import { createSlice } from '@reduxjs/toolkit'

type TInitialState = {
    enabled: boolean
}

const initialState: TInitialState = {
    enabled: true
}

const telegramShare = createSlice({
    name: 'telegram-share',
    initialState,
    reducers: {
        setShare: (state, action) => {
            state.enabled = action.payload
        }
    }
})

export const telegramShareActions = telegramShare.actions
export const telegramShareReducer = telegramShare.reducer
