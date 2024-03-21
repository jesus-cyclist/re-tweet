import { ScrollbarWrapper, type TUserTweetResponseItem } from '@/shared'
import { ReactNode, memo, useCallback, useMemo, useState } from 'react'
import { Comments, Dislike, Like } from '@/features'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Skeleton } from 'antd'
import { NewsCard } from '@/enteties/news'
import s from './tweet.module.scss'

const { Meta } = Card

type Props = {
    tweet: TUserTweetResponseItem
    loading: boolean
    tweetID: string
    comments: ReactNode
}

export const Tweet = memo((props: Props): JSX.Element => {
    const {
        tweet: { author, tweetedPost, tweetMessage, timestamp },
        loading,
        tweetID,
        comments
    } = props

    const [isCommentsOpen, setIsCommentsOpen] = useState(false)

    const handleToogleComments = useCallback(() => {
        setIsCommentsOpen(prev => !prev)
    }, [setIsCommentsOpen])

    const actions = useMemo(() => {
        return [
            <Like key={tweetID} tweetID={tweetID} />,
            <Dislike key={tweetID} tweetID={tweetID} />,
            <Comments
                key={tweetID}
                tweetID={tweetID}
                onClick={handleToogleComments}
            />
        ]
    }, [])

    return (
        <Card className={s.card} actions={actions}>
            <Skeleton loading={loading} avatar active>
                <Meta
                    avatar={
                        <Avatar
                            src={author?.photoURL || null}
                            icon={<UserOutlined />}
                        />
                    }
                    title={author?.displayName || 'Anonymous'}
                    description={timestamp}
                />
                <div className={s.container}>
                    <div className={s.empty}>
                        <Avatar src={author?.photoURL || null} />
                    </div>
                    <div className={s.content}>
                        <ScrollbarWrapper>
                            <span className={s.content__message}>
                                {tweetMessage}
                            </span>
                        </ScrollbarWrapper>
                        <NewsCard type={'background'} data={tweetedPost} />
                    </div>

                    {isCommentsOpen && comments}
                </div>
            </Skeleton>
        </Card>
    )
})

Tweet.displayName = 'Tweet'
