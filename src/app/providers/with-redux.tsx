import { WithRouter } from './with-router'
import { Provider } from 'react-redux'
import { store } from '../store'

export const WithRedux = () => {
    return (
        <Provider store={store}>
            <WithRouter />
        </Provider>
    )
}
