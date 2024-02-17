import ImageFallback from '@/shared/assets/image/image_fallback.jpg'
import Bookmark from '@/shared/assets/svg/bookmark.svg'
import { TSpaceFlightCard } from '@/shared'
import { NavLink } from 'react-router-dom'
import s from './news-card.module.scss'
import classNames from 'classnames'
import { Image } from 'antd'

type TNewsCardProps = {
    data: TSpaceFlightCard
    type: 'column' | 'background'
}

export const NewsCard = (props: TNewsCardProps): JSX.Element => {
    const {
        data: { title, image, date, news, url },
        type
    } = props

    switch (type) {
        case 'background':
            return (
                <div className={s.card}>
                    <Image
                        height={'100%'}
                        width={'100%'}
                        src={image}
                        fallback={ImageFallback}
                        preview={false}
                        alt={`image for ${title}`}
                    />
                    <div className={s.card__text}>
                        <NavLink
                            className={s.card__news}
                            to={url}
                            target='_blank'
                        >
                            {news}
                        </NavLink>
                        <h3 className={s.card__title}>{title}</h3>
                        <span className={s.card__date}>{date}</span>
                        <div className={s.card__bookmark}>
                            <Bookmark />
                        </div>
                    </div>
                </div>
            )

        case 'column':
            return (
                <div className={classNames(s.card, s.columnCard)}>
                    <Image
                        height={'100%'}
                        width={'100%'}
                        src={image}
                        fallback={ImageFallback}
                        preview={false}
                        alt={`image for ${title}`}
                        placeholder={
                            <Image
                                preview={false}
                                src={ImageFallback}
                                width={'100%'}
                                height={'100%'}
                            />
                        }
                    />
                    <div className={s.card__text}>
                        <NavLink
                            className={s.card__news}
                            to={url}
                            target='_blank'
                        >
                            {news}
                        </NavLink>
                        <h3 className={s.card__title}>{title}</h3>
                        <span className={s.card__date}>{date}</span>
                    </div>
                </div>
            )

        default:
            break
    }
}
