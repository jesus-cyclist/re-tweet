import { openNotification } from '@/shared'
import { Action, Middleware } from 'redux'

export const logger: Middleware = () => next => (action: Action) => {
    if (action.type === 'account/onAuth') {
        openNotification.success({
            description: 'You have successfully logged in'
        })
    }

    if (action.type === 'account/onUnAuth') {
        openNotification.success({
            description: 'You have successfully log out'
        })
    }

    return next(action)
}
