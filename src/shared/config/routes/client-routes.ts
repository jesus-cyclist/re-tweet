import { ComponentType } from 'react'

export enum ClientRoutes {
    MAIN_PATH = '/',
    SIGNIN_PATH = '/signin/',
    SIGNUP_PATH = '/signup/',
    NEWS_PATH = '/news/',
    FAVORITES_PATH = '/favourites/',
    SEARCH_PATH = '/search/',
    SEARCH_HISTORY_PATH = '/search-history/',
    TWEETS_PATH = '/tweets/',
    TWEET_CREATE_PATH = '/tweet-create/',
    NEWS_FRAME_PATH = '/news-frame/',
    PROFILE_PATH = '/profile/',
    PROFILE_PATH_EDIT = '/profile/edit',
    PROFILE_PATH_SETTINGS = '/profile/settings'
}

export interface RouteDescription {
    path: ClientRoutes
    component: ComponentType
}
