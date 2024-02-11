import { Provider } from 'react-redux'
import store from '../store'
import { WithAntd } from './with-antd'

export const WithRedux = () => {
    return (
        <Provider store={store}>
            <WithAntd />
        </Provider>
    )
}
