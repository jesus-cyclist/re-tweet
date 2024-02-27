import { Key, ReactNode, useMemo } from 'react'
import s from './filter.module.scss'
import classNames from 'classnames'

type TItems = {
    label: string
    icon?: ReactNode
    key: Key
    onClick?: Function
    isActive: boolean
}

type TFilterProps = {
    items: Array<TItems>
}

export const Filter = (props: TFilterProps): JSX.Element => {
    const { items } = props

    const getActiveClassName = useMemo(
        () => (isActive: boolean) => {
            return isActive ? classNames(s.filter, s.filterActive) : s.filter
        },
        [items]
    )

    return (
        <div className={s.container}>
            {items.map(({ label, icon, key, onClick, isActive }) => {
                return (
                    <div
                        key={key}
                        className={getActiveClassName(isActive)}
                        onClick={e => onClick(e)}
                    >
                        <span className={s.filter__text}>{label}</span>
                        {icon}
                    </div>
                )
            })}
        </div>
    )
}
