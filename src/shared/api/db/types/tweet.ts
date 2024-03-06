import type { TAuthUser, TUserCredentialID } from './arg'
import type { TNews } from '../../space-flight'

export type TTweetComment = {
    timestamp: string
    comment: string
    author: TAuthUser | null
}

export type TTweetCredentialID = string

export type TCredentialLikeTweet = {
    userID: TUserCredentialID
    tweetID: TTweetCredentialID
}

export type TLikes = {
    count: number
    users: Array<TUserCredentialID>
}

export type TDislikes = {
    count: number
    users: Array<TUserCredentialID>
}

export type TCredentialTweet = {
    author: TAuthUser | null
    tweetedPost: TNews
    tweetMessage: string
    hashtags?: Array<string>
}

export type TUserTweetResponseItem = TCredentialTweet & {
    timestamp: string
    comments?: Array<TTweetComment>
    id: TTweetCredentialID
    reaction?: { likes: TLikes; dislikes: TDislikes }
}
