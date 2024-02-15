import { Provider } from 'react-redux'
import { WithAuth } from './with-auth'
import store from '../store'

export const WithRedux = () => {
    return (
        <Provider store={store}>
            <WithAuth />
        </Provider>
    )
}
