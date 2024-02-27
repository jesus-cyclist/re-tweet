import { TSpaceFlightCard } from '../space-flight'

export type TFavourite = {
    timestamp: string
    data: TSpaceFlightCard
}

export type TSearch = {
    timestamp: string
    query: string
}
