import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app'

const getReacttion = (state: RootState) => state.tweet
export const selectReaction = createSelector(
    getReacttion,
    tweet => tweet.reaction
)
