import type {
    TReadStatusResponseItem,
    TFavouriteResponseItem,
    TSearchResponseItem
} from '@/shared'
import type { TAuthUser } from '@/shared'

export type TDBStatus = {
    email: string
    isAuth: boolean
}

export type TAuthUserWithPassword = TAuthUser & {
    password: string
    isAuth: boolean
}

export type TUser = TAuthUserWithPassword & {
    favourites: Array<TFavouriteResponseItem>
    search: Array<TSearchResponseItem>
    read: Array<TReadStatusResponseItem>
}
