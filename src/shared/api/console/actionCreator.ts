import { createAction } from '@reduxjs/toolkit'

export const actionCreator = createAction('console', (command, params) => ({
    payload: { command, params }
}))
