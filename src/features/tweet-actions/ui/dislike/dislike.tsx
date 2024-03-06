import {
    openNotification,
    useAppSelector,
    useGetDislikeTweetMutation
} from '@/shared'
import { selectAccountID } from '@/features/authentication'
import { DislikeOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react'
import { selectReaction } from '@/widgets'
import s from './dislike.module.scss'
import classNames from 'classnames'

type TProps = {
    tweetID: string
}

export const Dislike = (props: TProps) => {
    const { tweetID } = props
    const userID = useAppSelector(selectAccountID)
    const reactionStats = useAppSelector(selectReaction)
    const [fetchDislike] = useGetDislikeTweetMutation()
    const handleGetDislike = useCallback(() => {
        if (!userID) {
            openNotification.error({
                description: 'Only authorized users can leave reactions'
            })
            return
        }
        fetchDislike({ userID, tweetID })
    }, [userID, fetchDislike])

    const stats = useMemo(() => {
        return reactionStats.find(i => i.id === tweetID)
    }, [reactionStats])

    const getClassName = useMemo(() => {
        if (stats) {
            return stats.reaction.dislikes.users.includes(userID)
                ? classNames(s.reaction__icon, s.reaction__iconActive)
                : s.reaction__icon
        }

        return s.reaction__icon
    }, [userID, reactionStats])

    return (
        <div key={'dislike'} className={s.reaction} onClick={handleGetDislike}>
            <DislikeOutlined className={getClassName} />
            <span className={s.reaction__count}>
                {stats?.reaction.dislikes.count || 0}
            </span>
        </div>
    )
}
