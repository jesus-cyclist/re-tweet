import { animated, useSpringRef, useTransition } from '@react-spring/web'
import { useLocation } from 'react-router-dom'
import { AppRouter } from '../router'
import { useEffect } from 'react'

export const WithSprings = () => {
    const location = useLocation()
    const transRef = useSpringRef()

    const transitions = useTransition(location, {
        ref: transRef,
        keys: null,
        exitBeforeEnter: true,
        from: {
            opacity: 0,
            transform: 'translateX(100%) rotate(-45deg)'
        },
        enter: {
            opacity: 1,
            transform: 'translateX(0%) rotate(0deg)'
        },
        leave: {
            opacity: 0,
            transform: 'translateX(-100%) rotate(45deg)'
        }
        // config: { tension: 250, friction: 20 }
    })

    useEffect(() => {
        transRef.start()
    }, [location])

    return (
        <>
            {transitions(style => {
                return (
                    <animated.div
                        style={{
                            ...style,
                            top: 0,
                            left: 0,
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            margin: '0 auto',
                            overflow: 'hidden'
                        }}
                    >
                        <AppRouter />
                    </animated.div>
                )
            })}
        </>
    )
}
