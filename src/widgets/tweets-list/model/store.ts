import type { TDislikes, TLikes, TTweetCredentialID } from '@/shared'
import { createSlice } from '@reduxjs/toolkit'

type TInitialState = {
    reaction: Array<{
        id: TTweetCredentialID
        reaction: {
            likes: TLikes
            dislikes: TDislikes
        }
    }>
}

const initialState: TInitialState = {
    reaction: []
}

const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        setReaction: (state, action) => {
            state.reaction = action.payload
        }
    }
})

export const tweetActions = tweetSlice.actions
export const tweetReducer = tweetSlice.reducer
