import { HTMLAttributeAnchorTarget, ReactNode, useMemo } from 'react'
import { NavLink } from 'react-router-dom'

type TLinkUIProps = {
    className?: string
    to: string
    children: ReactNode
    stopDefault?: boolean
    target?: HTMLAttributeAnchorTarget | undefined
    state?: Record<string, string>
}

export const LinkUI = (props: TLinkUIProps): JSX.Element => {
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
