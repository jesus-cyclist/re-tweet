import s from './news-search-card.module.scss'
import { TSpaceFlightCard } from '@/shared'

type TNewsSearchCardProps = {
    data: TSpaceFlightCard
}

export const NewsSearchCard = (props: TNewsSearchCardProps): JSX.Element => {
    const {
        data: { title, date }
    } = props
    return (
        <div className={s.wrapper}>
            <div className={s.card}>
                <h2 className={s.card__title}>{title}</h2>
                <span className={s.card__date}>{date}</span>
            </div>
        </div>
    )
}
