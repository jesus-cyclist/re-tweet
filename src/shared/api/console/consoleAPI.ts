import { actionCreator } from './actionCreator'
import { TUserArgs } from '../db/types'
import { AppDispatch } from '@/app'

export const consoleAPI =
    (dispatch: AppDispatch) =>
    (...args: [string, TUserArgs]) => {
        const [command, params = null] = args

        if (command) {
            dispatch(actionCreator(command, params))
        }
    }
