import { WithErrorBoundary } from './with-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import { LoaderUI } from '@/shared'
import { Suspense } from 'react'

export const WithRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoaderUI isLoading />}>
                <WithErrorBoundary />
            </Suspense>
        </BrowserRouter>
    )
}
