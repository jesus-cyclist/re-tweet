import { TNews } from '../../space-flight'

export type TProfile = {
    name: string
}

export type TAuthUser = {
    email: string
    uid: string
    displayName: string
    photoURL: string
}

export type TUser = {
    userID: TUserCredentialID
    profile: TProfile
    settings: {}
}

export type TUserCredentialID = string

export type TUserCredential = {
    email: string
    password: string
    displayName?: string
    photoURL?: string
}

export type TUserCredentialFavourites = {
    userID: TUserCredentialID
    data: TNews
}

export type TFavouriteResponseItem = {
    timestamp: string
    data: TNews
}

export type TUserCredentialSearch = {
    userID: TUserCredentialID
    query: string
}

export type TSearchResponseItem = {
    timestamp: string
    query: string
}

export type TUserCredentialReadStatus = TUserCredentialFavourites

export type TReadStatusResponseItem = TFavouriteResponseItem

export type TSuccessResponse = {
    success: boolean
}

export type TUserArgs =
    | TUserCredentialSearch
    | TUserCredentialID
    | TUserCredentialFavourites
    | TUserCredential
