type TLaunches = {
    launch_id: string
    provider: string
}

type TEvents = {
    launch_id: string
    provider: string
}

export type TArticleItemResponse = {
    id: number
    title: string
    url: string
    image_url: string
    news_site: string
    summary: string
    published_at: string
    updated_at: string
    featured: boolean
    launches: Array<TLaunches>
    events: Array<TEvents>
}

export type TArticleResponse = {
    count: number
    next: string | null
    previous: string | null
    results: Array<TArticleItemResponse>
}

export type TArticleNewsResponseTransformed = {
    count: number
    next: string | null
    previous: string | null
    results: Array<TNews>
}

export type TNews = {
    id: number
    title: string
    url: string
    image: string
    news: string
    description: string
    date: string
    launches: Array<TLaunches>
    events: Array<TEvents>
}
