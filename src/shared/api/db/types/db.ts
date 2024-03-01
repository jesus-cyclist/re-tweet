import type {
    TFavourite,
    TReadStatus,
    TUserCredential,
    TUserFavourites,
    TUserID,
    TUserReadStatus,
    TUserSearch
} from '../types/arg'
import { DocumentData } from 'firebase/firestore'
import { TSuccess } from '../types/arg'
import { TAuthUser } from '@/features'

type TAuthMethods = {
    signUp: (authData: TUserCredential) => Promise<TAuthUser>
    signIn: (authData: TUserCredential) => Promise<TAuthUser>
    signOut: () => Promise<TSuccess>
    authState: () => Promise<TAuthUser>
}

type TFavouritesMethods = {
    toggleFavourite: ({ userID, data }: TUserFavourites) => Promise<TSuccess>
    getFavourites: (id: TUserID) => Promise<Array<TFavourite>>
}

type TSearchMethods = {
    getSearchQuery: ({ userID, query }: TUserSearch) => Promise<TSuccess>
    getSearchHistory: (userID: TUserID) => Promise<DocumentData>
    deleteSearchHistoryItem: ({
        userID,
        query
    }: TUserSearch) => Promise<TSuccess>
    clearSearchHistory: (userID: TUserID) => Promise<TSuccess>
}

type TReadedStatusMethods = {
    addReadedStatus: ({ userID, data }: TUserReadStatus) => Promise<TSuccess>
    getReaded: (id: TUserID) => Promise<Array<TReadStatus>>
}

export type TDBMethods = {
    search: TSearchMethods
    auth: TAuthMethods
    favourites: TFavouritesMethods
    readed: TReadedStatusMethods
}
