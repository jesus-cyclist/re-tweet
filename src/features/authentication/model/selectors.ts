import { createSelector } from 'reselect'
import { RootState } from '@/app'

const getAccountIsAuth = (state: RootState) => state.account
export const selectAccountIsAuth = createSelector(
    getAccountIsAuth,
    user => user.isAuth
)

const getAccountID = (state: RootState) => state.account
export const selectAccountID = createSelector(getAccountID, user => user.uid)
