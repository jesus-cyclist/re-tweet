import { TFavourite, TSearch } from '../../types'
import { TAuthUser } from '@/features'

export type TDBStatus = {
    email: string
    isAuth: boolean
}

export type TAuthUserWithPassword = TAuthUser & {
    password: string
    isAuth: boolean
}

export type TUser = TAuthUserWithPassword & {
    favourites: Array<TFavourite>
    search: Array<TSearch>
}
