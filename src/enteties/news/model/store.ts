import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { TFavouriteResponseItem } from '@/shared/api/db/types'

const readStatusAdapter = createEntityAdapter()

const initialState = readStatusAdapter.getInitialState()

const readSlice = createSlice({
    name: 'read-status',
    initialState,
    reducers: {
        readReceived(state, action) {
            const read = action.payload as Array<TFavouriteResponseItem>
            const normalizedRead = [
                ...read.map(item => {
                    return {
                        id: item.data.id,
                        readed: { ...item }
                    }
                })
            ]

            readStatusAdapter.setAll(state, normalizedRead)
        },

        resetRead(state) {
            readStatusAdapter.setAll(state, {})
        }
    }
})

export const readActions = readSlice.actions
export const readReducer = readSlice.reducer
