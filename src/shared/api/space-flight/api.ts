import {
    TSpaceFlightArticleItemResponse,
    TSpaceFlightArticleResponse,
    TSpaceFlightArticleResponseTransformed,
    TSpaceFlightCard
} from './types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SpaceFlightKeyConverter } from './data-field-transformer'
import { SpaceFlightApiRoutes } from '@/shared/config'

export const spaceFlightApi = createApi({
    reducerPath: 'spaceFlightApi',
    baseQuery: fetchBaseQuery({ baseUrl: SpaceFlightApiRoutes.BASE_PATH }),
    endpoints: builder => ({
        getArticles: builder.query<
            TSpaceFlightArticleResponseTransformed,
            { limit: number; offset: number }
        >({
            query: ({ limit, offset }) => ({
                url: SpaceFlightApiRoutes.ARTICLES_PATH,
                params: {
                    limit,
                    offset
                }
            }),
            transformResponse: (response: TSpaceFlightArticleResponse) => {
                const transformedResults = response.results.map(item =>
                    SpaceFlightKeyConverter.news(item)
                )

                return { ...response, results: transformedResults }
            }
        }),
        getArticlesBySearch: builder.query<
            TSpaceFlightArticleResponseTransformed,
            { phrase: string; limit: number; offset: number }
        >({
            query: ({ phrase, limit, offset }) => ({
                url: SpaceFlightApiRoutes.ARTICLES_PATH,
                params: {
                    search: phrase,
                    limit,
                    offset
                }
            }),
            transformResponse: (response: TSpaceFlightArticleResponse) => {
                const transformedResults = response.results.map(item =>
                    SpaceFlightKeyConverter.news(item)
                )

                return { ...response, results: transformedResults }
            }
        }),

        getArticlesById: builder.query<TSpaceFlightCard, { id: number }>({
            query: ({ id }) => ({
                url: `${SpaceFlightApiRoutes.ARTICLES_PATH}/${id}`
            }),
            transformResponse: (response: TSpaceFlightArticleItemResponse) => {
                const transformedResults =
                    SpaceFlightKeyConverter.news(response)

                return transformedResults
            }
        })

        // getBlogs: builder.query<
        //     TSpaceFlightArticleResponse,
        //     { limit: number; offset: number }
        // >({
        //     query: ({ limit = 10, offset = 10 }) => ({
        //         url: SpaceFlightApiRoutes.BLOGS_PATH,
        //         params: {
        //             limit,
        //             offset
        //         }
        //     })
        // }),
        // getInfo: builder.query<
        //     TSpaceFlightArticleResponse,
        //     { limit: number; offset: number }
        // >({
        //     query: ({ limit = 10, offset = 10 }) => ({
        //         url: SpaceFlightApiRoutes.INFO_PATH,
        //         params: {
        //             limit,
        //             offset
        //         }
        //     })
        // }),
        // getReports: builder.query<
        //     TSpaceFlightArticleResponse,
        //     { limit: number; offset: number }
        // >({
        //     query: ({ limit = 10, offset = 10 }) => ({
        //         url: SpaceFlightApiRoutes.REPORTS_PATH,
        //         params: {
        //             limit,
        //             offset
        //         }
        //     })
        // })
    })
})
