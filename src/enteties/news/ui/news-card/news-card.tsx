import {
    ClientRoutes,
    LinkUI,
    TNews,
    useAppSelector,
    useGetAddReadedStatusMutation,
    useGetAuthStateQuery
} from '@/shared'
import ImageFallback from '@/shared/assets/image/image_fallback.png'
import { NewsReadStatus } from '../news-read-status'
import { selectAccountIsAuth } from '@/features'
import { useLocation } from 'react-router-dom'
import { ReactNode, useCallback } from 'react'
import { NewsImage } from '../news-image'
import s from './news-card.module.scss'
import classNames from 'classnames'

type Props = {
    data: TNews
    type: 'column' | 'background' | 'row'
    children?: ReactNode
}

export const NewsCard = (props: Props): JSX.Element => {
    const {
        children,
        data: { title, image, date, news, id },
        type
    } = props
    const isAuth = useAppSelector(selectAccountIsAuth)
    const location = useLocation()
    const { data: userData } = useGetAuthStateQuery()
    const [fetchReaded] = useGetAddReadedStatusMutation()

    const handleOnOpenNews = useCallback(() => {
        if (userData) {
            fetchReaded({ userID: userData?.uid, data: props.data })
        }
    }, [userData, props.data])

    switch (type) {
        case 'background':
            return (
                <div className={s.card} data-test-id={'news-card'}>
                    {isAuth && <NewsReadStatus id={id} />}
                    <NewsImage
                        image={image}
                        title={title}
                        fallback={ImageFallback}
                    />
                    <div className={s.card__text}>
                        <LinkUI
                            className={s.card__news}
                            to={`${ClientRoutes.NEWS_PATH}:${id}`}
                            state={{ news: location.pathname }}
                            onClick={handleOnOpenNews}
                        >
                            {news}
                        </LinkUI>
                        <h3
                            className={s.card__title}
                            data-test-id={'news-card-title'}
                        >
                            {title}
                        </h3>
                        <span className={s.card__date}>{date}</span>
                        {children}
                    </div>
                </div>
            )

        case 'column':
            return (
                <div
                    className={classNames(s.card, s.columnCard)}
                    data-test-id={'news-card'}
                >
                    {isAuth && <NewsReadStatus id={id} />}
                    <NewsImage
                        image={image}
                        title={title}
                        fallback={ImageFallback}
                    />
                    <div className={s.card__text}>
                        <LinkUI
                            className={s.card__news}
                            to={`${ClientRoutes.NEWS_PATH}:${id}`}
                            state={{ news: location.pathname }}
                            onClick={handleOnOpenNews}
                        >
                            {news}
                        </LinkUI>
                        <h3
                            className={s.card__title}
                            data-test-id={'news-card-title'}
                        >
                            {title}
                        </h3>
                        <span className={s.card__date}>{date}</span>
                        {children}
                    </div>
                </div>
            )

        case 'row':
            return (
                <div
                    className={classNames(s.card, s.rowCard)}
                    data-test-id={'news-card'}
                >
                    <NewsImage
                        image={image}
                        title={title}
                        fallback={ImageFallback}
                    />
                    <div className={s.card__text}>
                        <LinkUI
                            className={s.card__news}
                            to={`${ClientRoutes.NEWS_PATH}:${id}`}
                            state={{ news: location.pathname }}
                            onClick={handleOnOpenNews}
                        >
                            {news}
                        </LinkUI>
                        <h3
                            className={s.card__title}
                            data-test-id={'news-card-title'}
                        >
                            {title}
                        </h3>
                        <span className={s.card__date}>{date}</span>
                        {children}
                    </div>
                </div>
            )

        default:
            break
    }
}
