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
import { onAuth, onUnAuth } from '@/features'
import { statisticsActions } from '@/widgets'

export const consoleMiddleware = createListenerMiddleware()
const startConsoleMiddleware = consoleMiddleware.startListening.withTypes<
    RootState,
    AppDispatch
>()

startConsoleMiddleware({
    actionCreator: actionCreator,
    effect: async (action, listenerApi) => {
        const { command, params } = action.payload

        switch (command) {
            case commands.authState.command:
                AuthService.authState().then(() =>
                    listenerApi.dispatch(onAuth())
                )
                break
            case commands.signout.command:
                AuthService.signOut().then(() => {
                    listenerApi.dispatch(statisticsActions.clearRead())
                    listenerApi.dispatch(onUnAuth())
                })

                break
            case commands.signin.command:
                AuthService.signIn(params).then(() =>
                    listenerApi.dispatch(onAuth())
                )
                break
            case commands.signup.command:
                AuthService.signUp(params).then(() =>
                    listenerApi.dispatch(onAuth())
                )
                break

            case commands.updateReadStatus.command:
                ReadedService.addReadedStatus(params)
                break
            case commands.getReaded.command:
                ReadedService.getReaded(params).then(res => {
                    listenerApi.dispatch(statisticsActions.addReadBefore(res))
                })
                break

            case commands.toggleFavourite.command:
                FavouriteService.toggleFavourite(params)
                break
            case commands.getFavourites.command:
                FavouriteService.getFavourites(params)
                break
            case commands.getSearchQuery.command:
                SearchService.getSearchQuery(params)
                break
            case commands.getSearchHistory.command:
                SearchService.getSearchHistory(params)
                break
            case commands.deleteSearchHistoryItem.command:
                SearchService.deleteSearchHistoryItem(params)
                break
            case commands.clearSearchHistory.command:
                SearchService.clearSearchHistory(params)
                break

            default:
                console.log('Something get wrong')
                help()
        }
    }
})
