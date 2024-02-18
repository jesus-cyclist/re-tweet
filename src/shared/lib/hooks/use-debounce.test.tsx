/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react'
import { useDebounce } from './use-debounce'

describe('test useDebounce hook', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')

    test('call function after delay', () => {
        const callback = jest.fn()
        const dependencie = 1
        const { rerender } = renderHook(useDebounce, {
            initialProps: {
                cb: callback,
                delay: 1000,
                dependencies: [dependencie]
            }
        })

        expect(callback).not.toHaveBeenCalled()
        rerender({ cb: callback, delay: 1000, dependencies: [2] })
        rerender({ cb: callback, delay: 3000, dependencies: [3] })
        rerender({ cb: callback, delay: 3000, dependencies: [4] })
        rerender({ cb: callback, delay: 3000, dependencies: [5] })
        jest.runAllTimers()
        expect(callback).toHaveBeenCalled()
        expect(callback).toHaveBeenCalledTimes(1)
    })
})
