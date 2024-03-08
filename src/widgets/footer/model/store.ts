import {
    PayloadAction,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit'
import { TFavouriteResponseItem } from '@/shared'
import { RootState } from '@/app'

const statisticsAdapter = createEntityAdapter()

const initialState = statisticsAdapter.getInitialState()

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        addRead: (state, action) => {
            //добавляется при откыртии непрочитанной ранее новости. при инвалидации
            //хэша метод setMany все равно добавит этот поставит, поставил его сюда для
            //примера
            statisticsAdapter.addOne(state, action.payload)
        },

        addReadBefore: (
            state,
            action: PayloadAction<Array<TFavouriteResponseItem>>
        ) => {
            //добавляется при получении ранее прочитанных новостей
            const readed = action.payload
            const normalizedRead = [
                ...readed.map(item => {
                    return {
                        id: item.data.id,
                        readed: { ...item }
                    }
                })
            ]
            statisticsAdapter.setMany(state, normalizedRead)
        },

        clearRead: statisticsAdapter.removeAll
    }
})

export const statisticsActions = statisticsSlice.actions
export const statisticsReducer = statisticsSlice.reducer

export const selectors = statisticsAdapter.getSelectors(
    (state: RootState) => state.statistics
)
