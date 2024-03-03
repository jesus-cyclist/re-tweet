/* eslint-disable no-console */

export const commands = {
    help: 'help',
    signin: 'signin',
    signup: 'signup',
    signout: 'signout',
    authState: 'auth-state',
    updateReadStatus: 'update-read-status',
    getReaded: 'get-readed',
    toggleFavourite: 'toggle-favourite',
    getFavourites: 'get-favourites',
    getSearchQuery: 'get-search-query',
    getSearchHistory: 'get-search-history',
    deleteSearchHistoryItem: 'delete-search-history-item',
    clearSearchHistory: 'clear-search-history'
}

export const help = () => {
    const com = Object.values(commands).join('\n')
    console.log(com)
}
