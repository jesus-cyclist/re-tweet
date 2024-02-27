type TLaunches = {
    launch_id: string
    provider: string
}

type TEvents = {
    launch_id: string
    provider: string
}

export type TSpaceFlightArticleItemResponse = {
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

export type TSpaceFlightArticleResponse = {
    count: number
    next: string | null
    previous: string | null
    results: Array<TSpaceFlightArticleItemResponse>
}

export type TSpaceFlightArticleResponseTransformed = {
    count: number
    next: string | null
    previous: string | null
    results: Array<TSpaceFlightCard>
}

export type TSpaceFlightCard = {
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
