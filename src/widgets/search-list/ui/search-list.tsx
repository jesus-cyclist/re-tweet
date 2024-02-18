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
import {
    SpaceFlightKeyConverter,
    TSpaceFlightArticleItemResponse,
    spaceFlightApi,
    useDebounce
} from '@/shared'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import { NewsSearchCard } from '@/enteties'
import s from './search-list.module.scss'
import { Flex, Input, Spin } from 'antd'

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
        itemSize: 76,
        width: 0
    })
    const listRef = useRef<null | HTMLDivElement>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchList, setSearchList] = useState<
        Array<TSpaceFlightArticleItemResponse>
    >([])
    const [fetch, { data }] = spaceFlightApi.useLazyGetArticlesBySearchQuery()

    const fetchSearch = async () => {
        if (searchValue) {
            await fetch({
                phrase: searchValue,
                limit: limit,
                offset: page * limit
            }).then(res => setSearchList(res.data.results))
        }
    }

    useDebounce({ cb: fetchSearch, delay: 2000, dependencies: [searchValue] })

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    useEffect(() => {
        if (!searchValue) {
            setSearchList([])
        }
    }, [searchValue])

    useEffect(() => {
        if (data) {
            setTotalItemsCount(data.count)
            setSearchList(prev => [...prev, ...data.results])
            setIsNextPageLoading(false)
        }
    }, [data])

    useEffect(() => {
        fetch({
            phrase: searchValue,
            limit: limit,
            offset: page * limit
        }).then(res => setSearchList(prev => [...prev, ...res.data.results]))
    }, [page])

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
            content = (
                <Flex
                    style={{ width: '100%', height: '100%' }}
                    align='center'
                    justify='center'
                    gap='middle'
                >
                    <Spin size='large' />
                </Flex>
            )
        } else {
            const element = searchList[index]
            const data = SpaceFlightKeyConverter.article(element)

            content = <NewsSearchCard key={data.id} data={data} />
        }

        return <div style={style}>{content}</div>
    })

    Item.displayName = 'Item'

    return (
        <div className={s.container}>
            <Input
                allowClear
                value={searchValue}
                placeholder='input search loading default'
                onChange={handleSearchChange}
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
                                className={s.test}
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
