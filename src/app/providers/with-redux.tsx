import { TUserArgs } from '@/shared/api/db/types'
import { WithRouter } from './with-router'
import { Provider } from 'react-redux'
import { consoleAPI } from '@/shared'
import { store } from '../store'

declare global {
    interface Window {
        consoleAPI: (...args: [string, TUserArgs]) => void
    }
}

function initConsoleAPI() {
    window.consoleAPI = consoleAPI(store.dispatch)
    if (!window.consoleAPI) {
        window.consoleAPI = consoleAPI(store.dispatch)
    }
}

initConsoleAPI()

export const WithRedux = () => {
    return (
        <Provider store={store}>
            <WithRouter />
        </Provider>
    )
}
