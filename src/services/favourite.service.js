const { localStorageService } = require("./storage.service")

const STORAGE_KEY = 'favUsers'


export const favouriteService = {
    getFavUsers,
    addToFavourites,
    removeFromFavourites
}

function addToFavourites(user) {
    const users = localStorageService.loadFromStorage(STORAGE_KEY) || []
    users.push(user)
    localStorageService.saveToStorage(STORAGE_KEY, users)
    return users
}

function removeFromFavourites(userId) {
    const users = localStorageService.loadFromStorage(STORAGE_KEY) || []

    const idx = users.findIndex(user => {
        return user.login.uuid === userId
    })

    users.splice(idx, 1)
    localStorageService.saveToStorage(STORAGE_KEY, users)

    return users
}

function getFavUsers() {
    const users = localStorageService.loadFromStorage(STORAGE_KEY) || []
    return users
}