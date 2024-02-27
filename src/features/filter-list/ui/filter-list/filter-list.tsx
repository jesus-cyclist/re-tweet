import { Filter, TFilterItemProps } from '../filter/filter'
import s from './filter-list.module.scss'
import { memo } from 'react'

export type TFilterListProps = {
    items: Array<TFilterItemProps>
}

export const FilterList = memo((props: TFilterListProps): JSX.Element => {
    const { items } = props

    return (
        <div className={s.container}>
            {items.map(filter => (
                <Filter key={filter.key} {...filter} />
            ))}
        </div>
    )
})

FilterList.displayName = 'FilterList'
