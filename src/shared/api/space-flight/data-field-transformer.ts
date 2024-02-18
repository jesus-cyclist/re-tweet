import { TSpaceFlightArticleItemResponse, TSpaceFlightCard } from './types'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

export class SpaceFlightKeyConverter {
    static article(obj: TSpaceFlightArticleItemResponse): TSpaceFlightCard {
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

        dayjs.extend(relativeTime)
        const date = dayjs(published_at).fromNow()

        return {
            id,
            title,
            url,
            image: image_url,
            news: news_site,
            description: summary,
            date,
            launches,
            events
        }
    }
}
