import { CommentOutlined } from '@ant-design/icons'
import { useGetCommentsQuery } from '@/shared'
import s from './comments.module.scss'
import { useMemo } from 'react'

type TProps = {
    onClick: () => void
    tweetID: string
}

export const Comments = (props: TProps) => {
    const { onClick, tweetID } = props

    const { data: commentsData = [] } = useGetCommentsQuery()

    const stats = useMemo(() => {
        return commentsData.find(i => i.id === tweetID)
    }, [commentsData])

    return (
        <div key={'comment'} className={s.comments} onClick={onClick}>
            <CommentOutlined key={'comment'} />
            <span className={s.comment__count}>
                {stats?.comments?.length || 0}
            </span>
        </div>
    )
}
