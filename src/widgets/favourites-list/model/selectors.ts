import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app'

const getFavouritesNews = (state: RootState) => state.favourites
export const selectFavouritesNews = createSelector(
    getFavouritesNews,
    favourites => favourites.list
)
