/* eslint-disable no-console */
import {
    AuthService,
    FavouriteService,
    ReadedService,
    SearchService,
    commands,
    help
} from './service'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import { actionCreator } from './actionCreator'
import { AppDispatch, RootState } from '@/app'

export const consoleMiddleware = createListenerMiddleware()
const startConsoleMiddleware = consoleMiddleware.startListening.withTypes<
    RootState,
    AppDispatch
>()

startConsoleMiddleware({
    actionCreator: actionCreator,
    effect: action => {
        const { command, params } = action.payload

        switch (command) {
            case commands.help:
                help()
                break
            case commands.authState:
                AuthService.authState()
                break
            case commands.signout:
                AuthService.signOut()
                break
            case commands.signin:
                AuthService.signIn(params)
                break
            case commands.signup:
                AuthService.signUp(params)
                break

            case commands.updateReadStatus:
                ReadedService.addReadedStatus(params)
                break
            case commands.getReaded:
                ReadedService.getReaded(params)
                break

            case commands.toggleFavourite:
                FavouriteService.toggleFavourite(params)
                break
            case commands.getFavourites:
                FavouriteService.getFavourites(params)
                break

            case commands.getSearchQuery:
                SearchService.getSearchQuery(params)
                break
            case commands.getSearchHistory:
                SearchService.getSearchHistory(params)
                break
            case commands.deleteSearchHistoryItem:
                SearchService.deleteSearchHistoryItem(params)
                break
            case commands.clearSearchHistory:
                SearchService.clearSearchHistory(params)
                break

            default:
                console.log('Something get wrong')
                help()
        }
    }
})
