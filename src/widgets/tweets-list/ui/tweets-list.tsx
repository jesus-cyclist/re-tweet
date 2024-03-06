import {
    ScrollbarWrapper,
    useAppDispatch,
    useGetReactionQuery,
    useGetTweetsQuery,
    useSortedByDate
} from '@/shared'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Comments, Dislike, FilterList, Like } from '@/features'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import SortIcon from '@/shared/assets/svg/sort-az.svg'
import type { TUserTweetResponseItem } from '@/shared'
import s from './tweets-list.module.scss'
import { tweetActions } from '../model'
import { Tweet } from '@/enteties'

export const TweetsList = React.memo(() => {
    const [isSortedByDate, setIsSortedByDate] = useState(true)
    const [tweetsList, setTweetsList] = useState<Array<TUserTweetResponseItem>>(
        []
    )
    const sortedList = useSortedByDate(tweetsList, isSortedByDate)
    const dispatch = useAppDispatch()
    const { data: tweetsData, isFetching } = useGetTweetsQuery()
    const { data: reactionData } = useGetReactionQuery()

    useEffect(() => {
        if (tweetsData) {
            setTweetsList(tweetsData)
        }
    }, [tweetsData])

    useEffect(() => {
        if (reactionData) {
            dispatch(tweetActions.setReaction(reactionData))
        }
    }, [reactionData])

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
        </div>
    )
})

TweetsList.displayName = 'TweetsList'
