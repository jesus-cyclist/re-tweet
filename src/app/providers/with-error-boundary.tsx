import { ErrorBoundary } from 'react-error-boundary'
import { WithAuth } from './with-auth'
import { ErrorUI } from '@/shared'

export const WithErrorBoundary = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorUI}>
            <WithAuth />
        </ErrorBoundary>
    )
}
