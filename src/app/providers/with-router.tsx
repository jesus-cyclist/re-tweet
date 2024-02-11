import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { WithRedux } from './with-redux'

export const WithRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback='Loading...'>
        <WithRedux />
      </Suspense>
    </BrowserRouter>
  )
}
