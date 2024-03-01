import ImageFallback from '@/shared/assets/image/image_fallback.png'
import { ClientRoutes, LinkUI, TNews } from '@/shared'
import { NewsReadStatus } from '../news-read-status'
import { useLocation } from 'react-router-dom'
import { NewsImage } from '../news-image'
import s from './news-card.module.scss'
import classNames from 'classnames'
import { ReactNode } from 'react'

type TNewsCardProps = {
    data: TNews
    type: 'column' | 'background' | 'row'
    children?: ReactNode
    readStatus?: boolean
}

export const NewsCard = (props: TNewsCardProps): JSX.Element => {
    const {
        children,
        data: { title, image, date, news, id },
        type,
        readStatus = false
    } = props
    const location = useLocation()

    switch (type) {
        case 'background':
            return (
                <div className={s.card}>
                    <NewsReadStatus readed={readStatus} />
                    <NewsImage
                        image={image}
                        title={title}
                        fallback={ImageFallback}
                    />
                    <div className={s.card__text}>
                        <LinkUI
                            className={s.card__news}
                            to={`${ClientRoutes.NEWS}:${id}`}
                            state={{ news: location.pathname }}
                        >
                            {news}
                        </LinkUI>
                        <h3 className={s.card__title}>{title}</h3>
                        <span className={s.card__date}>{date}</span>
                        {children}
                    </div>
                </div>
            )

        case 'column':
            return (
                <div className={classNames(s.card, s.columnCard)}>
                    <NewsImage
                        image={image}
                        title={title}
                        fallback={ImageFallback}
                    />
                    <div className={s.card__text}>
                        <LinkUI
                            className={s.card__news}
                            to={`${ClientRoutes.NEWS}:${id}`}
                            state={{ news: location.pathname }}
                        >
                            {news}
                        </LinkUI>
                        <h3 className={s.card__title}>{title}</h3>
                        <span className={s.card__date}>{date}</span>
                        {children}
                    </div>
                </div>
            )

        case 'row':
            return (
                <div className={classNames(s.card, s.rowCard)}>
                    <NewsImage
                        image={image}
                        title={title}
                        fallback={ImageFallback}
                    />
                    <div className={s.card__text}>
                        <LinkUI
                            className={s.card__news}
                            to={`${ClientRoutes.NEWS}:${id}`}
                            state={{ news: location.pathname }}
                        >
                            {news}
                        </LinkUI>
                        <h3 className={s.card__title}>{title}</h3>
                        <span className={s.card__date}>{date}</span>
                        {children}
                    </div>
                </div>
            )

        default:
            break
    }
}
