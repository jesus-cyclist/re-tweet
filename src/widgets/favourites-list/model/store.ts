import { createSlice } from '@reduxjs/toolkit'
import { TFavourite } from '@/shared'

type TInitialState = {
    list: Array<TFavourite>
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
