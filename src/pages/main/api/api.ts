import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const telegramApi = createApi({
    reducerPath: 'tg',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/api/' }),
    endpoints: builder => ({
        getTgShared: builder.query<{ isTelegramShareEnabled: boolean }, void>({
            query: () => `feature-flags`,
            keepUnusedDataFor: -1
        })
    })
})

export const { useGetTgSharedQuery } = telegramApi
