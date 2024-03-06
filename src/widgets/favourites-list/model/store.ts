import type { TFavouriteResponseItem } from '@/shared'
import { createSlice } from '@reduxjs/toolkit'

type TInitialState = {
    list: Array<TFavouriteResponseItem>
}

const initialState: TInitialState = {
    list: []
}

const favouritesSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        setFavourites: (state, action) => {
            state.list = action.payload
        }
    }
})

export const favouritesActions = favouritesSlice.actions
export const favouritesReducer = favouritesSlice.reducer
