import { accountReducer, accountAction } from './store'
import type { TInitialState } from './models'

describe('test account store', () => {
    const initialState: TInitialState = {
        uid: null,
        email: null,
        isAuth: false
    }

    it('should return initial value', () => {
        expect(accountReducer(undefined, { type: 'some action' })).toEqual(
            initialState
        )
    })

    it('should set account', () => {
        expect(
            accountReducer(
                undefined,
                accountAction.setAccount({ email: 1, uid: 2 })
            )
        ).toEqual({
            uid: 2,
            email: 1,
            isAuth: true
        })
    })

    it('should unset account', () => {
        expect(accountReducer(undefined, accountAction.unsetAccount())).toEqual(
            initialState
        )
    })
})