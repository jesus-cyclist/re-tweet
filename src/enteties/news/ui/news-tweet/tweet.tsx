import { ScrollbarWrapper, type TUserTweetResponseItem } from '@/shared'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Skeleton } from 'antd'
import { NewsCard } from '@/enteties/news'
import { ReactNode, memo } from 'react'
import s from './tweet.module.scss'

const { Meta } = Card

type Props = {
    tweet: TUserTweetResponseItem
    loading: boolean
    actions?: Array<ReactNode>
}

export const Tweet = memo((props: Props): JSX.Element => {
    const {
        tweet: { author, tweetedPost, tweetMessage, timestamp },
        loading,
        actions
    } = props

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
                </div>
            </Skeleton>
        </Card>
    )
})

Tweet.displayName = 'Tweet'
