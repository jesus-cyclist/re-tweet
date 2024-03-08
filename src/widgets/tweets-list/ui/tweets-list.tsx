import {
    LoaderUI,
    ScrollbarWrapper,
    useGetTweetsQuery,
    useSortedByDate
} from '@/shared'
import { Comments, Dislike, FilterList, Like } from '@/features'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import React, { useCallback, useMemo, useState } from 'react'
import SortIcon from '@/shared/assets/svg/sort-az.svg'
import s from './tweets-list.module.scss'
import { Tweet } from '@/enteties'

export const TweetsList = React.memo(() => {
    const [isSortedByDate, setIsSortedByDate] = useState(true)
    const { data: tweetsData = [], isFetching } = useGetTweetsQuery()
    const sortedList = useSortedByDate(tweetsData, isSortedByDate)

    const handleSort = useCallback(() => {
        setIsSortedByDate(prev => !prev)
    }, [setIsSortedByDate])

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
            {tweetsData ? (
                <div className={s.container}>
                    <div>{sortedList && <FilterList items={items} />}</div>
                    <ScrollbarWrapper>
                        <div className={s.list}>
                            {sortedList.map(tweet => {
                                const updatedTweet = {
                                    ...tweet,
                                    timestamp: converDateIsoToSince(
                                        tweet.timestamp
                                    ),
                                    tweetedPost: {
                                        ...tweet.tweetedPost,
                                        date: converDateIsoToSince(
                                            tweet.tweetedPost.date
                                        )
                                    }
                                }

                                return (
                                    <Tweet
                                        key={tweet.id}
                                        tweet={updatedTweet}
                                        loading={isFetching}
                                        actions={[
                                            <Like
                                                key={tweet.id}
                                                tweetID={tweet.id}
                                            />,
                                            <Dislike
                                                key={tweet.id}
                                                tweetID={tweet.id}
                                            />,
                                            <Comments key={tweet.id} />
                                        ]}
                                    />
                                )
                            })}
                        </div>
                    </ScrollbarWrapper>
                </div>
            ) : (
                <LoaderUI isLoading />
            )}
        </div>
    )
})

TweetsList.displayName = 'TweetsList'
