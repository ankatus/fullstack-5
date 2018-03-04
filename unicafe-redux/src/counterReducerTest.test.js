import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 4,
        bad: 2
    }

    it('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    it('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 4,
            bad: 2
        })
    })

    it('returns new state with action GOOD', () => {
        const state = {
            good: 0,
            ok: 0,
            bad: 0
        }

        const action = {
            type: 'GOOD'
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)

        expect(newState.good).toBe(1)
    })

    it('returns new state with action OK', () => {
        const state = {
            good: 0,
            ok: 0,
            bad: 0
        }

        const action = {
            type: 'OK'
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)

        expect(newState.ok).toBe(1)
    })

    it('returns new state with action BAD', () => {
        const state = {
            good: 0,
            ok: 0,
            bad: 0
        }

        const action = {
            type: 'BAD'
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)

        expect(newState.bad).toBe(1)
    })

    it('returns new state with action ZERO', () => {
        const state = {
            good: 1,
            ok: 1,
            bad: 1
        }
  
        const action = {
            type: 'ZERO'
        }
  
        deepFreeze(state)
        const newState = counterReducer(state, action)
  
        expect(newState.good).toBe(0)
        expect(newState.ok).toBe(0)
        expect(newState.bad).toBe(0)
    })
})