import * as firebase from './firebase'
import { TDBMethods } from '../types'
import * as localStorage from './ls'

const choosenDb = process.env.REACT_APP_REMOTE_STORE || 'firebase'
const dbMethods = choosenDb === 'firebase' ? firebase : localStorage

export const db: TDBMethods = {
    search: { ...dbMethods.search },
    auth: { ...dbMethods.auth },
    favourites: { ...dbMethods.favourites },
    readed: { ...dbMethods.readStatus }
}
