import { alertMessage } from "./alert.service"

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
    alertMessage(`${user.name.first} ${user.name.last} has been added to favorites`, 'success', 2500)
    return users
}

function removeFromFavourites(user) {
    const users = localStorageService.loadFromStorage(STORAGE_KEY) || []

    const idx = users.findIndex(currUser => {
        return currUser.login.uuid === user.login.uuid
    })

    users.splice(idx, 1)
    localStorageService.saveToStorage(STORAGE_KEY, users)
    alertMessage(`${user.name.first} ${user.name.last} has been removed from favorites`, 'danger', 2500)

    return users
}

function getFavUsers() {
    const users = localStorageService.loadFromStorage(STORAGE_KEY) || []
    return users
}