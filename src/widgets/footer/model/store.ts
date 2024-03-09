import {
    PayloadAction,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit'
import { TFavouriteResponseItem } from '@/shared'
import { RootState } from '@/app'

const statisticsAdapter = createEntityAdapter({
    selectId: (statistics: TFavouriteResponseItem) => statistics.data.id,
    sortComparer: (a, b) => a.timestamp.localeCompare(b.timestamp)
})

const initialState = statisticsAdapter.getInitialState()

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        addReadBefore: (
            state,
            action: PayloadAction<Array<TFavouriteResponseItem>>
        ) => {
            statisticsAdapter.setMany(state, action.payload)
        },

        clearRead: statisticsAdapter.removeAll
    }
})

export const statisticsActions = statisticsSlice.actions
export const statisticsReducer = statisticsSlice.reducer

export const selectors = statisticsAdapter.getSelectors(
    (state: RootState) => state.statistics
)
