import {
    openNotification,
    useGetAuthStateQuery,
    useGetDislikeTweetMutation,
    useGetReactionQuery
} from '@/shared'
import { DislikeOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react'
import s from './dislike.module.scss'
import classNames from 'classnames'

type TProps = {
    tweetID: string
}

export const Dislike = (props: TProps) => {
    const { tweetID } = props
    const { data: userData } = useGetAuthStateQuery()
    const { data: reactionStats = [] } = useGetReactionQuery()
    const [fetchDislike] = useGetDislikeTweetMutation()

    const handleGetDislike = useCallback(() => {
        if (!userData?.uid) {
            openNotification.error({
                description: 'Only authorized users can leave reactions'
            })
            return
        }
        fetchDislike({ userID: userData.uid, tweetID })
    }, [userData, fetchDislike])

    const stats = useMemo(() => {
        return reactionStats.find(i => i.id === tweetID)
    }, [reactionStats])

    const getClassName = useMemo(() => {
        if (stats && userData) {
            return stats.reaction.dislikes.users.includes(userData.uid)
                ? classNames(s.reaction__icon, s.reaction__iconActive)
                : s.reaction__icon
        }

        return s.reaction__icon
    }, [userData, reactionStats])

    return (
        <div key={'dislike'} className={s.reaction} onClick={handleGetDislike}>
            <DislikeOutlined className={getClassName} />
            <span className={s.reaction__count}>
                {stats?.reaction.dislikes.count || 0}
            </span>
        </div>
    )
}
