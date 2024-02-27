import { ScrollbarWrapper, useAppSelector, useSortedByDate } from '@/shared'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import SortIcon from '@/shared/assets/svg/sort-az.svg'
import { selectFavouritesNews } from '../model'
import { memo, useMemo, useState } from 'react'
import { NewsControlPanel } from '@/features'
import s from './favourite-list.module.scss'
import { FilterList } from '@/features'
import { NewsCard } from '@/enteties'

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

    console.log('render favourite list')

    return (
        <div className={s.container}>
            <div>{sortedList && <FilterList items={items} />}</div>
            <ScrollbarWrapper>
                <div className={s.list}>
                    {sortedList.map(favourite => {
                        const datePublished = converDateIsoToSince(
                            favourite.data.date
                        )
                        const dateAddedToFavourite = converDateIsoToSince(
                            favourite.timestamp
                        )
                        return (
                            <NewsCard
                                key={favourite.data.id}
                                data={{
                                    ...favourite.data,
                                    date: datePublished
                                }}
                                type={'row'}
                            >
                                <div className={s.bottomPanel}>
                                    <span className={s.bottomPanel__text}>
                                        {`Added to favourites ${dateAddedToFavourite}`}
                                    </span>
                                    <NewsControlPanel data={favourite.data} />
                                </div>
                            </NewsCard>
                        )
                    })}
                </div>
            </ScrollbarWrapper>
        </div>
    )
})

FavouritesList.displayName = 'FavouritesList'
