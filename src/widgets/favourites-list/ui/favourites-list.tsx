import { ScrollbarWrapper, useAppSelector, useSortedByDate } from '@/shared'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import SortIcon from '@/shared/assets/svg/sort-az.svg'
import { selectFavouritesNews } from '../model'
import { memo, useMemo, useState } from 'react'
import { NewsControlPanel } from '@/features'
import s from './favourite-list.module.scss'
import { FilterList } from '@/features'
import { NewsCard } from '@/enteties'
import { Alert } from 'antd'

export const FavouritesList = memo(() => {
    const [isSortedByDate, setIsSortedByDate] = useState(true)
    const favourites = useAppSelector(selectFavouritesNews)
    const sortedList = useSortedByDate(favourites, isSortedByDate)

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
        <div className={s.wrapper}>
            {sortedList.length ? (
                <div className={s.container}>
                    <div>{sortedList && <FilterList items={items} />}</div>
                    <ScrollbarWrapper>
                        <div className={s.list}>
                            {sortedList.map(newsData => {
                                const datePublished = converDateIsoToSince(
                                    newsData.data.date
                                )
                                const dateAddedToFavourite =
                                    converDateIsoToSince(newsData.timestamp)
                                return (
                                    <NewsCard
                                        key={newsData.data.id}
                                        data={{
                                            ...newsData.data,
                                            date: datePublished
                                        }}
                                        type={'row'}
                                    >
                                        <div className={s.bottomPanel}>
                                            <span
                                                className={s.bottomPanel__text}
                                            >
                                                {`Added to favourites ${dateAddedToFavourite}`}
                                            </span>
                                            <NewsControlPanel
                                                newsData={newsData.data}
                                            />
                                        </div>
                                    </NewsCard>
                                )
                            })}
                        </div>
                    </ScrollbarWrapper>
                </div>
            ) : (
                <Alert
                    message='Info'
                    description='The favourites news will appear here'
                    type='info'
                />
            )}
        </div>
    )
})

FavouritesList.displayName = 'FavouritesList'
