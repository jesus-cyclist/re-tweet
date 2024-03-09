import {
    ClientRoutes,
    useClickOutSide,
    useDebounce,
    useGetAuthStateQuery,
    useGetSearchQueryMutation,
    useLazyGetArticlesBySearchQuery
} from '@/shared'
import {
    ChangeEvent,
    ReactNode,
    memo,
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import s from './search-panel.module.scss'
import Search from 'antd/es/input/Search'
import classNames from 'classnames'

export const SearchPanel = memo(() => {
    const location = useLocation()
    const { data: userData } = useGetAuthStateQuery()
    const userID = userData?.uid
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchListResult, setSearchListResult] =
        useState<Array<ReactNode>>(null)
    const [fetchSearchList, { isFetching }] = useLazyGetArticlesBySearchQuery()

    const [onSearchUpdate] = useGetSearchQueryMutation()

    const listRef = useRef<HTMLUListElement | null>(null)
    const searchPanelRef = useRef<HTMLDivElement | null>(null)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handlerUpdatedSearch = () => {
        closeDropdown()
        if (userID) {
            onSearchUpdate({ userID, query: searchValue })
        }
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    useClickOutSide({ ref: searchPanelRef, cb: closeDropdown })

    const fetchSearch = useCallback(
        async (value: string) => {
            if (value) {
                await fetchSearchList({
                    phrase: value,
                    limit: 5,
                    offset: 0
                }).then(res => {
                    const queryResponse = res.data.results.map(
                        ({ id, title }) => {
                            return (
                                <li
                                    className={s.search__listItem}
                                    key={id}
                                    onClick={closeDropdown}
                                >
                                    <NavLink
                                        className={s.search__link}
                                        to={`${ClientRoutes.NEWS_PATH}:${id}`}
                                        data-test-id={'search-link'}
                                    >
                                        {title}
                                    </NavLink>
                                </li>
                            )
                        }
                    )

                    if (!queryResponse.length) {
                        setSearchListResult([
                            <li
                                className={s.search__listItemEmpty}
                                key={'search-link'}
                                data-test-id={'search-link'}
                            >
                                {'Nothing was found'}
                            </li>
                        ])

                        return
                    }

                    const searchLink = (
                        <li
                            className={s.search__listItem}
                            key={'search-link'}
                            onClick={handlerUpdatedSearch}
                        >
                            <NavLink
                                className={s.search__link}
                                key={'search-link'}
                                to={`${ClientRoutes.SEARCH_PATH}?q=${searchValue}`}
                            >
                                {'Show all'}
                            </NavLink>
                        </li>
                    )

                    setSearchListResult([...queryResponse, searchLink])
                })

                setIsDropdownOpen(true)
            }
        },
        [fetch, searchValue]
    )

    const debouncedSearch = useDebounce({ callback: fetchSearch, delay: 1000 })

    const getActiveClassName = useMemo(() => {
        return location.pathname === ClientRoutes.SEARCH_PATH
            ? classNames(s.search, s.searchHidden)
            : s.search
    }, [location])

    const handleOnFocus = useCallback(() => {
        if (searchValue) {
            setIsDropdownOpen(true)
        }
    }, [searchValue, setIsDropdownOpen])

    return (
        <div className={getActiveClassName} ref={searchPanelRef}>
            <Search
                allowClear
                value={searchValue}
                placeholder='Search...'
                loading={isFetching}
                onChange={handleInputChange}
                onSearch={(value: string) => debouncedSearch(value)}
                data-test-id={'search-input'}
                onFocus={handleOnFocus}
            />
            <CSSTransition
                nodeRef={listRef}
                in={isDropdownOpen}
                timeout={200}
                classNames={{
                    enter: s.search__dropdownEnter,
                    enterDone: s.search__dropdownEnterDone
                }}
            >
                <ul
                    className={s.search__dropdown}
                    ref={listRef}
                    data-test-id={'search-list'}
                >
                    {searchListResult &&
                        searchListResult.map(newsItem => newsItem)}
                </ul>
            </CSSTransition>
        </div>
    )
})

SearchPanel.displayName = 'SearchPanel'
