/* eslint-disable no-console */

export const commands = {
    signin: {
        command: 'signin',
        use: "consoleAPI('signin', {email, password})"
    },
    signup: {
        command: 'signup',
        use: "consoleAPI('signup',{email, password})"
    },
    signout: {
        command: 'signout',
        use: "consoleAPI('signup')"
    },
    authState: {
        command: 'auth-state',
        use: "consoleAPI('signout')"
    },
    updateReadStatus: {
        command: 'update-read-status',
        use: "consoleAPI('update-read-status', {userID, data})"
    },
    getReaded: {
        command: 'get-readed',
        use: "consoleAPI('get-readed', userID)"
    },
    toggleFavourite: {
        command: 'toggle-favourite',
        use: "consoleAPI('toggle-favourite', {userID, data})"
    },
    getFavourites: {
        command: 'get-favourites',
        use: "consoleAPI('get-favourites', userID)"
    },
    getSearchQuery: {
        command: 'get-search-query',
        use: "consoleAPI('get-search-query', {userID, query})"
    },
    getSearchHistory: {
        command: 'get-search-history',
        use: "consoleAPI('get-search-history', userID)"
    },
    deleteSearchHistoryItem: {
        command: 'delete-search-history-item',
        use: "consoleAPI('delete-search-history-item', {userID, query})"
    },
    clearSearchHistory: {
        command: 'clear-search-history',
        use: "consoleAPI('clear-search-history', userID)"
    }
}

export const help = () => {
    console.table(
        Object.entries(commands).map(([, value]) => ({
            Command: value.command,
            Example: value.use
        }))
    )
}
