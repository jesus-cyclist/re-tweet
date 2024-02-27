import { TSpaceFlightArticleItemResponse, TSpaceFlightCard } from './types'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

export class SpaceFlightKeyConverter {
    static news(obj: TSpaceFlightArticleItemResponse): TSpaceFlightCard {
        if (!obj) {
            return {
                id: 0,
                title: '',
                url: '',
                image: '',
                news: '',
                description: '',
                date: '',
                launches: [],
                events: []
            }
        }

        const {
            id = 0,
            title = '',
            url = '',
            image_url = '',
            news_site = '',
            summary = '',
            published_at = '',
            launches = [],
            events = []
        } = obj

        return {
            id,
            title,
            url,
            image: image_url,
            news: news_site,
            description: summary,
            date: published_at,
            launches,
            events
        }
    }

    static convertPublishDate(date: string) {
        dayjs.extend(relativeTime)
        const transformedDate = dayjs(date).fromNow()
        return transformedDate
    }
}
