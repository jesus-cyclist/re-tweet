import { TNews } from '../space-flight'

export type TFavourite = {
    timestamp: string
    data: TNews
}

export type TSearch = {
    timestamp: string
    query: string
}
