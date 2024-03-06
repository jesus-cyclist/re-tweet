import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useDebounce, useLazyGetArticlesBySearchQuery } from '@/shared'
import { useLocation } from 'react-router-dom'
import s from './search-list.module.scss'
import Search from 'antd/es/input/Search'
import type { TNews } from '@/shared'
import { List } from '../list/list'
import { Alert } from 'antd'

export const SearchList = React.memo(() => {
    const [isNextPageLoading, setIsNextPageLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [limit] = useState(40)
    const [totalItemsCount, setTotalItemsCount] = useState(0)
    const [hasNextPage, setHasNextPage] = useState(false)

    const [searchValue, setSearchValue] = useState<string>('')
    const [searchList, setSearchList] = useState<Array<TNews>>([])
    const [fetch, { data, isFetching }] = useLazyGetArticlesBySearchQuery()
    const location = useLocation()

    useEffect(() => {
        if (location.state?.search) {
            setSearchValue(location.state.search)
            window.history.replaceState(null, '')
        }
    }, [])

    const fetchSearch = useCallback(async () => {
        if (searchValue) {
            await fetch({
                phrase: searchValue,
                limit: limit,
                offset: page * limit
            }).then(res => setSearchList(res.data.results))
        }

        if (!searchValue) {
            setPage(1)
        }
    }, [searchValue, fetch, page, setSearchList])

    const debouncedFetch = useDebounce({ callback: fetchSearch, delay: 1000 })

    const handleSearchChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPage(1)
            setSearchValue(e.target.value)
        },
        [setPage, setSearchValue]
    )

    useEffect(() => {
        if (data) {
            setTotalItemsCount(data.count)
            setSearchList(prev => [...prev, ...data.results])
            setIsNextPageLoading(false)
        }
    }, [data])

    useEffect(() => {
        if (!searchValue) {
            setSearchList([])
        }

        if (searchValue) {
            debouncedFetch()
        }
    }, [page, searchValue])

    const loadNextPage = useCallback(async () => {
        setIsNextPageLoading(true)
        setPage(prev => prev + 1)
    }, [setIsNextPageLoading, setPage])

    useEffect(() => {
        setHasNextPage(searchList.length < totalItemsCount)
    }, [searchList, totalItemsCount])

    const itemCount = hasNextPage ? searchList.length + 1 : searchList.length

    const loadMoreItems = useMemo(
        () => (isNextPageLoading ? () => {} : loadNextPage),
        [isNextPageLoading]
    )

    const handleClearSearchResult = useCallback(() => {
        if (!searchValue) {
            setSearchList([])
        }
    }, [searchValue, setSearchList])

    return (
        <div className={s.container}>
            <Search
                value={searchValue}
                placeholder='input search loading default'
                onChange={handleSearchChange}
                allowClear
                loading={isFetching}
                onBlur={handleClearSearchResult}
            />
            {searchValue ? (
                <List
                    list={searchList}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                    isLoading={isFetching}
                />
            ) : (
                <Alert
                    className={s.alert}
                    message='Info'
                    description='The search result will appear here'
                    type='info'
                />
            )}
        </div>
    )
})

SearchList.displayName = 'SearchList'
