import { accountReducer } from '@/features'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    account: accountReducer
})
