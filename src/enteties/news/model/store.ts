import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { TFavourite } from '@/shared/api/db/types'

const readStatusAdapter = createEntityAdapter()

const initialState = readStatusAdapter.getInitialState()

const readSlice = createSlice({
    name: 'read-status',
    initialState,
    reducers: {
        readReceived(state, action) {
            const read = action.payload as Array<TFavourite>
            const normalizedRead = [
                ...read.map(item => {
                    return {
                        id: item.data.id,
                        readed: { ...item }
                    }
                })
            ]
            // console.log(read, normalizedRead)
            readStatusAdapter.setAll(state, normalizedRead)
        }
    }
})

export const readActions = readSlice.actions
export const readReducer = readSlice.reducer
