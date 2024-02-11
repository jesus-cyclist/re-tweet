import { animated, useSpringRef, useTransition } from '@react-spring/web'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AppRouter } from '../router'

export const WithSprings = () => {
  const location = useLocation()
  const transRef = useSpringRef()

  const transitions = useTransition(location, {
    ref: transRef,
    keys: null,
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  })
  useEffect(() => {
    transRef.start()
  }, [location])

  return (
    <>
      {transitions((style) => {
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
              overflow: 'hidden',
            }}
          >
            <AppRouter />
          </animated.div>
        )
      })}
    </>
  )
}
