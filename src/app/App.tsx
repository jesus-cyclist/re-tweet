import '@/shared/api/db/provider/firebase/config'
import { WithProviders } from './providers'
import '@/shared/styles/base.scss'

export const App = () => {
    return <WithProviders />
}
