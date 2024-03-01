import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app'

const getIsTelegramSharedEnabled = (state: RootState) => state.shareTg
export const selectIsTgShareEnabled = createSelector(
    getIsTelegramSharedEnabled,
    state => state.enabled
)
