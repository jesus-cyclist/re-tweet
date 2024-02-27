import {
    ClientRoutes,
    FirebaseSearch,
    LoaderUI,
    TSearch,
    useAppSelector,
    useSortedByDate
} from '@/shared'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import SortIcon from '@/shared/assets/svg/sort-az.svg'
import { useEffect, useMemo, useState } from 'react'
import s from './history-search-list.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { authSelectors } from '@/features'
import { FilterList } from '@/features'

export const HistorySearchList = () => {
    const [isSortedByDate, setIsSortedByDate] = useState(true)
    const userID = useAppSelector(authSelectors.selectAccountID)
    const [searchHistoryList, setSearchHistoryList] = useState<Array<TSearch>>(
        []
    )

    const sortedList = useSortedByDate(searchHistoryList, isSortedByDate)

    useEffect(() => {
        FirebaseSearch.getSearchHistory(userID).then(res => {
            setSearchHistoryList(res)
        })
    }, [])

    const handleSort = () => {
        setIsSortedByDate(prev => !prev)
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
        <div className={s.container}>
            <div>{sortedList && <FilterList items={items} />}</div>
            <ul className={s.list}>
                {sortedList ? (
                    sortedList.map(({ timestamp, query }) => {
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
                                    onClick={() =>
                                        FirebaseSearch.deleteSearchHistoryItem(
                                            userID,
                                            query
                                        )
                                    }
                                >
                                    <CloseOutlined />
                                </button>
                            </li>
                        )
                    })
                ) : (
                    <LoaderUI isLoading />
                )}
            </ul>
        </div>
    )
}
