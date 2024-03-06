import {
    openNotification,
    useAppSelector,
    useGetLikeTweetMutation
} from '@/shared'
import { selectAccountID } from '@/features/authentication'
import { LikeOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react'
import { selectReaction } from '@/widgets'
import classNames from 'classnames'
import s from './like.module.scss'

type TProps = {
    tweetID: string
}

export const Like = (props: TProps) => {
    const { tweetID } = props
    const userID = useAppSelector(selectAccountID)
    const reactionStats = useAppSelector(selectReaction)
    const [fetchLike] = useGetLikeTweetMutation()

    const handleGetLike = useCallback(() => {
        if (!userID) {
            openNotification.error({
                description: 'Only authorized users can leave reactions'
            })
            return
        }
        fetchLike({ userID, tweetID })
    }, [userID, fetchLike])

    const stats = useMemo(() => {
        return reactionStats.find(i => i.id === tweetID)
    }, [reactionStats])

    const getClassName = useMemo(() => {
        if (stats) {
            return stats.reaction.likes.users.includes(userID)
                ? classNames(s.reaction__icon, s.reaction__iconActive)
                : s.reaction__icon
        }
        return s.reaction__icon
    }, [userID, reactionStats])

    return (
        <div key={'like'} className={s.reaction} onClick={handleGetLike}>
            <LikeOutlined className={getClassName} />
            <span className={s.reaction__count}>
                {stats?.reaction.likes.count || 0}
            </span>
        </div>
    )
}
