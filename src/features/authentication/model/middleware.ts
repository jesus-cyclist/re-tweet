import { openNotification } from '@/shared'
import { Action, Middleware } from 'redux'

export const logger: Middleware = () => next => (action: Action) => {
    if (action.type === 'account/setAccount') {
        openNotification.success({
            description: 'You have successfully logged in'
        })
    }

    return next(action)
}
