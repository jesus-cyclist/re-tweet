import { FirebaseErrorHandler } from './error-handler'

describe('test error respone', () => {
    it('should return unknown error', () => {
        expect(
            FirebaseErrorHandler.getError({
                message: 'something',
                code: 'code',
                name: 'name'
            })
        ).toEqual('Unknown error')

        expect(
            FirebaseErrorHandler.getError({
                message: '',
                code: 'code',
                name: 'name'
            })
        ).toEqual('Unknown error')
    })

    it('should return valid error', () => {
        expect(
            FirebaseErrorHandler.getError({
                message: 'Firebase: Error (auth/invalid-credential).',
                code: 'code',
                name: 'name'
            })
        ).toEqual('Invalid credential')

        expect(
            FirebaseErrorHandler.getError({
                message:
                    'Firebase: Error (auth/invalid-session-cookie-duration).',
                code: 'code',
                name: 'name'
            })
        ).toEqual('Invalid session cookie duration')
    })
})
