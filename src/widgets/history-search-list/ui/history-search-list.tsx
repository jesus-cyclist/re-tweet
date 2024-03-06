import {
    ClientRoutes,
    useAppSelector,
    useDeleteSearchHistoryItemMutation,
    useLazyGetSearchHistoryQuery,
    useSortedByDate
} from '@/shared'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import SortIcon from '@/shared/assets/svg/sort-az.svg'
import { useEffect, useMemo, useState } from 'react'
import type { TSearchResponseItem } from '@/shared'
import s from './history-search-list.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import { selectAccountID } from '@/features'
import { NavLink } from 'react-router-dom'
import { FilterList } from '@/features'
import { Alert } from 'antd'

export const HistorySearchList = () => {
    const [isSortedByDate, setIsSortedByDate] = useState(true)
    const userID = useAppSelector(selectAccountID)
    const [searchHistoryList, setSearchHistoryList] = useState<
        Array<TSearchResponseItem>
    >([])
    const [fetchSearchHistoryList, { data }] = useLazyGetSearchHistoryQuery()
    const [fetchDeleteSearchHistoryItem] = useDeleteSearchHistoryItemMutation()

    useEffect(() => {
        if (data) {
            setSearchHistoryList(data)
        }
    }, [data])

    const sortedList = useSortedByDate(searchHistoryList, isSortedByDate)

    useEffect(() => {
        fetchSearchHistoryList(userID)
    }, [])

    const handleSort = () => {
        setIsSortedByDate(prev => !prev)
    }

    const handleDeleteSearch = async (query: string) => {
        await fetchDeleteSearchHistoryItem({ userID, query })
    }

    const items = useMemo(
        () => [
            {
                label: 'Date',
                icon: <SortIcon />,
                onClick: handleSort,
                key: 'filter-1',
                isActive: isSortedByDate
            }
        ],
        [handleSort, isSortedByDate]
    )

    return (
        <div>
            {sortedList.length ? (
                <div className={s.container}>
                    <div>
                        <FilterList items={items} />
                    </div>
                    <ul className={s.list}>
                        {sortedList.map(({ timestamp, query }) => {
                            const date = converDateIsoToSince(timestamp)
                            return (
                                <li
                                    className={s.list__item}
                                    key={`${timestamp}${query}`}
                                >
                                    <NavLink
                                        to={ClientRoutes.SEARCH_PATH}
                                        className={s.list__itemLink}
                                        state={{ search: query }}
                                    >
                                        <span className={s.list__itemQuery}>
                                            {query}
                                        </span>
                                        <span className={s.list__itemTimestamp}>
                                            {date}
                                        </span>
                                    </NavLink>
                                    <button
                                        className={s.list__itemDelete}
                                        onClick={() => {
                                            handleDeleteSearch(query)
                                        }}
                                    >
                                        <CloseOutlined />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : (
                <Alert
                    message='Info'
                    description='The search history will appear here'
                    type='info'
                />
            )}
        </div>
    )
}
