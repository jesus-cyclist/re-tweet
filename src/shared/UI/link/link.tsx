import { HTMLAttributeAnchorTarget, ReactNode, useMemo } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
    className?: string
    to: string
    children: ReactNode
    stopDefault?: boolean
    target?: HTMLAttributeAnchorTarget | undefined
    state?: Record<string, string>
    onClick?: () => void
}

export const LinkUI = (props: Props): JSX.Element => {
    const {
        children,
        to,
        state,
        className,
        stopDefault = true,
        target = undefined,
        onClick = () => {}
    } = props

    const handleLinkClick = useMemo(
        () => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onClick()
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
