import { TNews } from '../../space-flight'

export type TUserID = string

export type TUserCredential = {
    email: string
    password: string
}

export type TUserFavourites = {
    userID: TUserID
    data: TNews
}

export type TFavourite = {
    timestamp: string
    data: TNews
}

export type TUserSearch = {
    userID: TUserID
    query: string
}

export type TSearch = {
    timestamp: string
    query: string
}

export type TUserReadStatus = TUserFavourites

export type TReadStatus = TFavourite

export type TSuccess = {
    success: boolean
}
