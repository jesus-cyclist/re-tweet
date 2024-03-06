import type {
    TFavouriteResponseItem,
    TReadStatusResponseItem,
    TUserCredential,
    TUserCredentialFavourites,
    TUserCredentialID,
    TUserCredentialReadStatus,
    TUserCredentialSearch
} from '../types/arg'
import {
    TCredentialLikeTweet,
    TCredentialTweet,
    TUserTweetResponseItem
} from '..'
import { DocumentData } from 'firebase/firestore'
import { TSuccessResponse } from '../types/arg'
import { TAuthUser } from '../types/arg'

type TAuthMethods = {
    signUp: (authData: TUserCredential) => Promise<TAuthUser>
    signIn: (authData: TUserCredential) => Promise<TAuthUser>
    signOut: () => Promise<TSuccessResponse>
    authState: () => Promise<TAuthUser>
    getUserData: () => Promise<
        Pick<TUserCredential, 'photoURL' | 'displayName'>
    >
    updateUserData: ({
        photoURL,
        displayName
    }: Pick<TUserCredential, 'photoURL' | 'displayName'>) => Promise<TAuthUser>
}

type TFavouritesMethods = {
    toggleFavourite: ({
        userID,
        data
    }: TUserCredentialFavourites) => Promise<TSuccessResponse>
    getFavourites: (
        id: TUserCredentialID
    ) => Promise<Array<TFavouriteResponseItem>>
}

type TSearchMethods = {
    getSearchQuery: ({
        userID,
        query
    }: TUserCredentialSearch) => Promise<TSuccessResponse>
    getSearchHistory: (userID: TUserCredentialID) => Promise<DocumentData>
    deleteSearchHistoryItem: ({
        userID,
        query
    }: TUserCredentialSearch) => Promise<TSuccessResponse>
    clearSearchHistory: (userID: TUserCredentialID) => Promise<TSuccessResponse>
}

type TReadedStatusMethods = {
    addReadedStatus: ({
        userID,
        data
    }: TUserCredentialReadStatus) => Promise<TSuccessResponse>
    getReaded: (
        id: TUserCredentialID
    ) => Promise<Array<TReadStatusResponseItem>>
}

type TTweetMethods = {
    postTweet: ({
        author,
        tweetedPost,
        tweetMessage,
        hashtags
    }: TCredentialTweet) => Promise<TSuccessResponse>
    getLikeTweet: ({
        userID,
        tweetID
    }: TCredentialLikeTweet) => Promise<TSuccessResponse>
    getDislikeTweet: ({
        userID,
        tweetID
    }: TCredentialLikeTweet) => Promise<TSuccessResponse>
    getTweets: () => Promise<
        Array<Omit<TUserTweetResponseItem, 'comments' | 'reaction'>>
    >
    getReaction: () => Promise<
        Array<Pick<TUserTweetResponseItem, 'comments' | 'reaction' | 'id'>>
    >
}

export type TDBMethods = {
    search: TSearchMethods
    auth: TAuthMethods
    favourites: TFavouritesMethods
    readed: TReadedStatusMethods
    tweet: TTweetMethods
}
