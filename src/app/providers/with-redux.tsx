import { TUserArgs, consoleAPI, help } from '@/shared'
import { WithRouter } from './with-router'
import { Provider } from 'react-redux'
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
    help()
}

initConsoleAPI()

export const WithRedux = () => {
    return (
        <Provider store={store}>
            <WithRouter />
        </Provider>
    )
}
