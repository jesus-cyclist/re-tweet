import {
    openNotification,
    useGetAuthStateQuery,
    useGetLikeTweetMutation,
    useGetReactionQuery
} from '@/shared'
import { LikeOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import s from './like.module.scss'

type TProps = {
    tweetID: string
}

export const Like = (props: TProps) => {
    const { tweetID } = props
    const { data: userData } = useGetAuthStateQuery()
    const { data: reactionStats = [] } = useGetReactionQuery()
    const [fetchLike] = useGetLikeTweetMutation()

    const handleGetLike = useCallback(() => {
        if (!userData?.uid) {
            openNotification.error({
                description: 'Only authorized users can leave reactions'
            })
            return
        }
        fetchLike({ userID: userData.uid, tweetID })
    }, [userData, fetchLike])

    const stats = useMemo(() => {
        return reactionStats.find(i => i.id === tweetID)
    }, [reactionStats])

    const getClassName = useMemo(() => {
        if (stats && userData) {
            return stats.reaction.likes.users.includes(userData.uid)
                ? classNames(s.reaction__icon, s.reaction__iconActive)
                : s.reaction__icon
        }
        return s.reaction__icon
    }, [userData, reactionStats])

    return (
        <div key={'like'} className={s.reaction} onClick={handleGetLike}>
            <LikeOutlined className={getClassName} />
            <span className={s.reaction__count}>
                {stats?.reaction.likes.count || 0}
            </span>
        </div>
    )
}
