import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app'

const getIFrame = (state: RootState) => state.IFrameReducer
export const selectIsIframe = createSelector(getIFrame, iframe => iframe.enable)
