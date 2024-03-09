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
        onFrameToggled: (state, action) => {
            state.enable = action.payload
        }
    }
})

export const { onFrameToggled } = IFrameSlice.actions
export const IFrameReducer = IFrameSlice.reducer
