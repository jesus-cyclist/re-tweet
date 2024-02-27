import { TSpaceFlightArticleItemResponse, TSpaceFlightCard } from './types'
import { SpaceFlightKeyConverter } from './data-field-transformer'

describe('test data field converter function', () => {
    jest.mock('dayjs', () => {
        return jest.fn(() => ({
            fromNow: jest.fn(() => 'mocked date')
        }))
    })

    test('test with valid response', () => {
        const case_1 = {
            id: 1,
            title: '2',
            url: '3',
            image_url: '4',
            news_site: '5',
            summary: '6',
            published_at: '7',
            updated_at: '8',
            featured: false,
            launches: [],
            events: []
        } as TSpaceFlightArticleItemResponse

        const transformedData: TSpaceFlightCard =
            SpaceFlightKeyConverter.news(case_1)

        expect(transformedData).toEqual({
            id: 1,
            title: '2',
            url: '3',
            image: '4',
            news: '5',
            description: '6',
            date: case_1.published_at,
            launches: case_1.launches,
            events: case_1.events
        })
    })

    test('test with invalid response', () => {
        const case_1 = {
            id: 1,
            title: '2',
            url: '3',
            image_url: '4',
            news_site: '5',
            summary: '6',
            published_at: '7',
            updated_at: '8'
        }

        const transformedData_1: TSpaceFlightCard =
            SpaceFlightKeyConverter.news(
                case_1 as TSpaceFlightArticleItemResponse
            )

        expect(transformedData_1).toEqual({
            id: 1,
            title: '2',
            url: '3',
            image: '4',
            news: '5',
            description: '6',
            date: case_1.published_at,
            launches: [],
            events: []
        })

        const case_2: TSpaceFlightArticleItemResponse = null

        const transformedData_2: TSpaceFlightCard =
            SpaceFlightKeyConverter.news(
                case_2 as TSpaceFlightArticleItemResponse
            )

        expect(transformedData_2).toEqual({
            id: 0,
            title: '',
            url: '',
            image: '',
            news: '',
            description: '',
            date: '',
            launches: [],
            events: []
        })
    })
})
