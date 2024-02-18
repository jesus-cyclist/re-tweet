import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SpaceFlightApiRoutes } from '@/shared/config'
import { TSpaceFlightArticleResponse } from './types'

export const spaceFlightApi = createApi({
    reducerPath: 'spaceFlightApi',
    baseQuery: fetchBaseQuery({ baseUrl: SpaceFlightApiRoutes.BASE_PATH }),
    endpoints: builder => ({
        getArticles: builder.query<
            TSpaceFlightArticleResponse,
            { limit: number; offset: number }
        >({
            query: ({ limit, offset }) => ({
                url: SpaceFlightApiRoutes.ARTICLES_PATH,
                params: {
                    limit,
                    offset
                }
            })
        }),
        getArticlesBySearch: builder.query<
            TSpaceFlightArticleResponse,
            { phrase: string; limit: number; offset: number }
        >({
            query: ({ phrase, limit, offset }) => ({
                url: SpaceFlightApiRoutes.ARTICLES_PATH,
                params: {
                    search: phrase,
                    limit,
                    offset
                }
            })
        })
        // getArticlesById: builder.query<TSpaceFlightArticleResponse, number>({
        //     query: (id: number) => ({
        //         url: `${SpaceFlightApiRoutes.ARTICLES_PATH}/${id}`
        //     })
        // }),
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
