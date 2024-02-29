import * as firebase from './firebase'
import { TDBMethods } from '../types'
import * as localStorage from './ls'

const choosenDb = process.env.REACT_APP_REMOTE_STORE || 'firebase'
const dbMethods = choosenDb === 'firebase' ? firebase : localStorage

export const db: TDBMethods = {
    favourites: { ...dbMethods.favourites },
    search: { ...dbMethods.search },
    auth: { ...dbMethods.auth }
}
