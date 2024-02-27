import { TArticleItemResponse, TNews } from './types'

export class SpaceFlightKeyConverter {
    static news(obj: TArticleItemResponse): TNews {
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
}
