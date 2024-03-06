import {
    ClientRoutes,
    useAppSelector,
    useClickOutSide,
    useDebounce,
    useGetSearchQueryMutation,
    useLazyGetArticlesBySearchQuery
} from '@/shared'
import {
    ChangeEvent,
    ReactNode,
    memo,
    useCallback,
    useRef,
    useState
} from 'react'
import { selectAccountID } from '@/features/authentication'
import { CSSTransition } from 'react-transition-group'
import s from './search-panel.module.scss'
import { NavLink } from 'react-router-dom'
import Search from 'antd/es/input/Search'

export const SearchPanel = memo(() => {
    const userID = useAppSelector(selectAccountID)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchListResult, setSearchListResult] =
        useState<Array<ReactNode>>(null)
    const [fetchSearchList, { isFetching }] = useLazyGetArticlesBySearchQuery()

    const [fetchSearchUpdate] = useGetSearchQueryMutation()

    const listRef = useRef<HTMLUListElement | null>(null)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handlerUpdatedSearch = () => {
        closeDropdown()
        if (userID) {
            fetchSearchUpdate({ userID, query: searchValue })
        }
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    useClickOutSide({ ref: listRef, cb: closeDropdown })

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
                        <li className={s.search__listItem} key={'search-link'}>
                            <NavLink
                                className={s.search__link}
                                key={'search-link'}
                                to={ClientRoutes.SEARCH_PATH}
                                state={{ search: `${searchValue}` }}
                                onClick={handlerUpdatedSearch}
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

    return (
        <div className={s.search}>
            <Search
                allowClear
                value={searchValue}
                placeholder='Search...'
                loading={isFetching}
                onChange={handleInputChange}
                onSearch={(value: string) => debouncedSearch(value)}
                data-test-id={'search-input'}
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
