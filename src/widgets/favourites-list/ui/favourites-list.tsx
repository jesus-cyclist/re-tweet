import {
    ScrollbarWrapper,
    SpaceFlightKeyConverter,
    useAppSelector,
    useSortedByDate
} from '@/shared'
import SortIcon from '@/shared/assets/svg/sort-az.svg'
import { selectFavouritesNews } from '../model'
import { NewsControlPanel } from '@/features'
import s from './favourite-list.module.scss'
import { Filter } from '@/features/filter'
import { useMemo, useState } from 'react'
import { NewsCard } from '@/enteties'

export const FavouritesList = () => {
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
        <div className={s.container}>
            <div>{sortedList && <Filter items={items} />}</div>
            <ScrollbarWrapper>
                <div className={s.list}>
                    {sortedList.map(favourite => {
                        const datePublished =
                            SpaceFlightKeyConverter.convertPublishDate(
                                favourite.data.date
                            )
                        const dateAddedToFavourite =
                            SpaceFlightKeyConverter.convertPublishDate(
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
}
