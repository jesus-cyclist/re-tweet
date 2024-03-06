import { HTMLAttributeAnchorTarget, ReactNode, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

type Props = {
    className?: string
    to: string
    children: ReactNode
    stopDefault?: boolean
    target?: HTMLAttributeAnchorTarget | undefined
    state?: Record<string, string>
}

export const LinkUI = (props: Props): JSX.Element => {
    const {
        children,
        to,
        state,
        className,
        stopDefault = true,
        target = undefined
    } = props

    const handleLinkClick = useMemo(
        () => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            if (stopDefault && window.location.pathname === to) {
                e.preventDefault()
            }
        },
        [to, stopDefault]
    )

    return (
        <NavLink
            to={to}
            className={className}
            onClick={handleLinkClick}
            target={target}
            state={state}
        >
            {children}
        </NavLink>
    )
}

LinkUI.propsTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    stopDefault: PropTypes.bool,
    target: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([undefined])
    ]),
    state: PropTypes.object
}
