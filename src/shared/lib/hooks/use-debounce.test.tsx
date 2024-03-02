/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './use-debounce'
import { expect } from '@jest/globals'

describe('test useDebounce hook', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')

    test('call function after delay', () => {
        const callback = jest.fn()

        const { result } = renderHook(() =>
            useDebounce({ callback, delay: 1000 })
        )

        expect(callback).not.toHaveBeenCalled()
        act(() => {
            result.current()
            result.current()
            result.current()
        })
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(callback).toHaveBeenCalled()
        expect(callback).toHaveBeenCalledTimes(1)
    })
})
