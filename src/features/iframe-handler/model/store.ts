import { createSlice } from '@reduxjs/toolkit'

type TInitialState = {
    enable: boolean
}

const initialState: TInitialState = {
    enable: false
}

const IFrameSlice = createSlice({
    name: 'iframe',
    initialState,
    reducers: {
        setIFrame: (state, action) => {
            state.enable = action.payload
        }
    }
})

export const IFrameAction = IFrameSlice.actions
export const IFrameReducer = IFrameSlice.reducer
