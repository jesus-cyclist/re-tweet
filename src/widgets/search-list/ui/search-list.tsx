import {
    CSSProperties,
    ChangeEvent,
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react'
import { LoaderUI, TNews, spaceFlightApi, useDebounce } from '@/shared'
import InfiniteLoader from 'react-window-infinite-loader'
import { useLocation } from 'react-router-dom'
import { FixedSizeList } from 'react-window'
import s from './search-list.module.scss'
import Search from 'antd/es/input/Search'
import { NewsCard } from '@/enteties'

type TItemProps = {
    index: number
    style: CSSProperties
}

export const SearchList = () => {
    const [isNextPageLoading, setIsNextPageLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [limit] = useState(40)
    const [totalItemsCount, setTotalItemsCount] = useState(0)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [listParams, setListParams] = useState({
        height: 0,
        itemSize: 260,
        width: 0
    })
    const listRef = useRef<null | HTMLDivElement>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchList, setSearchList] = useState<Array<TNews>>([])
    const [fetch, { data, isFetching }] =
        spaceFlightApi.useLazyGetArticlesBySearchQuery()
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

    const debouncedFetch = useDebounce({ callback: fetchSearch, delay: 0 })

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPage(1)
        setSearchValue(e.target.value)
    }

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

    const loadNextPage = async () => {
        setIsNextPageLoading(true)
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        setHasNextPage(searchList.length < totalItemsCount)
    }, [searchList, totalItemsCount])

    const itemCount = hasNextPage ? searchList.length + 1 : searchList.length

    const updateListParams = useCallback(() => {
        if (listRef.current) {
            const height = listRef.current.offsetHeight
            const width = listRef.current.offsetWidth
            setListParams(prev => ({ ...prev, height, width }))
        }
    }, [listRef])

    useLayoutEffect(updateListParams, [updateListParams])

    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

    const isItemLoaded = (index: number) => Boolean(searchList[index])

    const Item = memo(({ index, style }: TItemProps) => {
        let content
        if (!isItemLoaded(index)) {
            content = <LoaderUI isLoading />
        } else {
            const element = searchList[index]

            content = (
                <div className={s.wrapperCard}>
                    <NewsCard type={'row'} data={element} />
                </div>
            )
        }

        return <div style={style}>{content}</div>
    })

    Item.displayName = 'Item'

    return (
        <div className={s.container}>
            <Search
                value={searchValue}
                placeholder='input search loading default'
                onChange={handleSearchChange}
                allowClear
                loading={isFetching}
            />

            <div className={s.list} ref={listRef}>
                {Boolean(searchValue) && (
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={loadMoreItems}
                    >
                        {({ onItemsRendered, ref }) => (
                            <FixedSizeList
                                className={s.fixedSizeList}
                                height={listParams.height}
                                itemCount={itemCount}
                                itemSize={listParams.itemSize}
                                onItemsRendered={onItemsRendered}
                                ref={ref}
                                width={listParams.width}
                            >
                                {Item}
                            </FixedSizeList>
                        )}
                    </InfiniteLoader>
                )}
            </div>
        </div>
    )
}
