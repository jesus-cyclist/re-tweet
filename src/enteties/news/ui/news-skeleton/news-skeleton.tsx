import s from './news-skeleton.module.scss'
import classNames from 'classnames'
import { Skeleton } from 'antd'

type TNewsCardProps = {
    type: 'column' | 'background' | 'row'
}

export const NewsSkeleton = (props: TNewsCardProps): JSX.Element => {
    const { type } = props

    switch (type) {
        case 'background':
            return (
                <div className={s.card}>
                    <Skeleton.Image className={s.card__image} active />
                    <Skeleton paragraph={{ rows: 2 }} />
                </div>
            )

        case 'column':
            return (
                <div className={s.card}>
                    <Skeleton.Image className={s.card__image} active />
                    <Skeleton paragraph={{ rows: 4 }} />
                </div>
            )

        case 'row':
            return (
                <div className={classNames(s.card, s.rowCard)}>
                    <Skeleton.Image className={s.card__image} active />
                    <Skeleton paragraph={{ rows: 4 }} />
                </div>
            )

        default:
            break
    }
}
