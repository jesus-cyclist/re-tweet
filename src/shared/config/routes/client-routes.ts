import { ComponentType } from 'react'

export enum ClientRoutes {
    MAIN_PATH = '/',
    SIGNIN_PATH = '/signin/',
    SIGNUP_PATH = '/signup/',
    FAVORITES_PATH = '/favorites/',
    SEARCH_PATH = '/search/',
    SEARCH_HISTORY_PATH = '/search-history/',
    TWEET = '/tweet/',
    NEWS = '/news/'
}

export interface RouteDescription {
    path: ClientRoutes
    component: ComponentType
}
