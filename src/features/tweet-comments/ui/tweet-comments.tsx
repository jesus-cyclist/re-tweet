import {
    ScrollbarWrapper,
    openNotification,
    useGetAuthStateQuery,
    useGetCommentsQuery,
    useGetSendCommentMutation
} from '@/shared'
import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import { CSSTransition } from 'react-transition-group'
import { Avatar, Button, Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import s from './tweet-comments.module.scss'

type TProps = {
    tweetID: string
}

export const TweetComments = (props: TProps) => {
    const { tweetID } = props
    const commentsListRef = useRef<HTMLDivElement | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const { data: commentsData } = useGetCommentsQuery()
    const [fetchSendComment] = useGetSendCommentMutation()
    const [commentValue, setCommentValue] = useState('')
    const { data: userData = null } = useGetAuthStateQuery()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleSendComment = useCallback(() => {
        if (!commentValue) {
            openNotification.error({ description: 'Your comment is empty' })
            return
        }
        fetchSendComment({
            tweetID,
            data: { comment: commentValue, author: userData }
        }).then(() => setCommentValue(''))
    }, [commentValue])

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentValue(e.target.value)
    }

    const comments = useMemo(() => {
        return commentsData.find(i => i.id === tweetID)
    }, [commentsData])

    return (
        <CSSTransition
            nodeRef={commentsListRef}
            in={isMounted}
            timeout={200}
            classNames={{
                enter: s.containerEnter,
                enterDone: s.containerEnterDone
            }}
        >
            <div className={s.container} ref={commentsListRef}>
                <ScrollbarWrapper>
                    <div className={s.comments}>
                        {comments.comments.map(i => {
                            const { author, comment, timestamp } = i

                            const key = `${author}${comment}${timestamp}`
                            return (
                                <div key={key} className={s.comment}>
                                    <Avatar
                                        src={author?.photoURL || null}
                                        icon={<UserOutlined />}
                                    />

                                    <div className={s.comment__body}>
                                        <div className={s.comment__header}>
                                            <span className={s.comment__author}>
                                                {author?.displayName ||
                                                    'Anonymous'}
                                            </span>
                                            <span
                                                className={s.comment__timestamp}
                                            >
                                                {converDateIsoToSince(
                                                    i.timestamp
                                                )}
                                            </span>
                                        </div>

                                        <span className={s.comment__text}>
                                            {i.comment}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollbarWrapper>
                <Space.Compact style={{ width: '100%' }}>
                    <Input
                        value={commentValue}
                        placeholder='Write your comment'
                        allowClear
                        maxLength={512}
                        onChange={handleChangeInputValue}
                    />
                    <Button type='primary' onClick={handleSendComment}>
                        Send
                    </Button>
                </Space.Compact>
            </div>
        </CSSTransition>
    )
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ut quam, voluptates doloribus beatae tenetur soluta ea explicabo, officiis doloremque necessitatibus laudantium sint quasi vitae, est a. Nam, expedita ullam.
