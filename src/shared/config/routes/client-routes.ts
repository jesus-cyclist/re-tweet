import { ComponentType } from 'react'

export enum ClientRoutes {
    MAIN_PATH = '/',
    SIGNIN_PATH = '/signin',
    SIGNUP_PATH = '/signup',
    HISTORY_PATH = '/history',
    FAVORITES_PATH = '/favorites',
    SEARCH_PATH = '/search'
}

export interface RouteDescription {
    path: ClientRoutes
    component: ComponentType
}
