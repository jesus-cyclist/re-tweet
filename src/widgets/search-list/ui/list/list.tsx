import React, {
    CSSProperties,
    memo,
    useCallback,
    useLayoutEffect,
    useRef,
    useState
} from 'react'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import { NewsCard } from '@/enteties'
import type { TNews } from '@/shared'
import { LoaderUI } from '@/shared'
import s from './list.module.scss'

type TProps = {
    list: Array<TNews>
    itemCount: number
    loadMoreItems: () => void
    isLoading: boolean
}

type TItemProps = {
    index: number
    style: CSSProperties
}

export const List = React.memo((props: TProps) => {
    const { list, itemCount, loadMoreItems, isLoading } = props
    const listRef = useRef<null | HTMLDivElement>(null)
    const [listParams, setListParams] = useState({
        height: 0,
        itemSize: 260,
        width: 0
    })

    const isItemLoaded = (index: number) => Boolean(list[index])

    const updateListParams = useCallback(() => {
        if (listRef.current) {
            const height = listRef.current.offsetHeight
            const width = listRef.current.offsetWidth
            setListParams(prev => ({ ...prev, height, width }))
        }
    }, [listRef])
    useLayoutEffect(updateListParams, [updateListParams])

    const Item = memo(({ index, style }: TItemProps) => {
        let content
        if (!isItemLoaded(index)) {
            content = <LoaderUI isLoading />
        } else {
            const element = list[index]

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
        <div className={s.list} ref={listRef}>
            {isLoading ? (
                <LoaderUI isLoading />
            ) : (
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
    )
})

List.displayName = 'List'
