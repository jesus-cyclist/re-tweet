import { ComponentType } from 'react'

export enum ClientRoutes {
    MAIN_PATH = '/',
    SIGNIN_PATH = '/signin',
    SIGNUP_PATH = '/signup',
    HISTORY_PATH = '/history',
    FAVORITES_PATH = '/favorites',
    SEARCH_PATH = '/search',
    TWEET = '/tweet',
    CURRENTS_NEWS = '/currents-news'
}

export interface RouteDescription {
    path: ClientRoutes
    component: ComponentType
}
