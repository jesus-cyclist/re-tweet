import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app'

const getReaded = (state: RootState) => state.read
export const selectReaded = createSelector(getReaded, state => state.entities)
