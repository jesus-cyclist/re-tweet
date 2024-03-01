import React, { Key, ReactNode, useMemo } from 'react'
import s from './filter.module.scss'
import classNames from 'classnames'

export type TFilterItemProps = {
    label: string
    icon?: ReactNode
    key: Key
    onClick?: Function
    isActive: boolean
}

export const Filter = (props: TFilterItemProps) => {
    const { label, icon, onClick, isActive } = props

    const getActiveClassName = useMemo(
        () => (isActive: boolean) => {
            return isActive ? classNames(s.filter, s.filterActive) : s.filter
        },
        [isActive]
    )

    return (
        <div className={getActiveClassName(isActive)} onClick={e => onClick(e)}>
            <span className={s.filter__text}>{label}</span>
            {icon}
        </div>
    )
}
