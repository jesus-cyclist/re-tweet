import {
    ClientRoutes,
    LinkUI,
    LoaderUI,
    ScrollbarWrapper,
    useAppDispatch,
    useAppSelector,
    useGetAddReadedStatusMutation,
    useGetArticlesByIdQuery,
    useGetAuthStateQuery
} from '@/shared'
import ImageFallback from '@/shared/assets/image/image_fallback.png'
import { selectIsIframe } from '@/features/iframe-handler/model'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import { NewsControlPanel } from '@/features'
import { statisticsActions } from '@/widgets'
import { useParams } from 'react-router-dom'
import s from './news-info.module.scss'
import { useEffect } from 'react'
import { Image } from 'antd'

const NewsInfo = () => {
    const params = useParams()
    const isIFrameEnable = useAppSelector(selectIsIframe)
    const { data: userData } = useGetAuthStateQuery()
    const { data: newsApiData } = useGetArticlesByIdQuery({
        id: parseInt(params.id.slice(1))
    })
    const dispatch = useAppDispatch()
    const [fetchReaded] = useGetAddReadedStatusMutation()

    useEffect(() => {
        if (newsApiData) {
            dispatch(
                statisticsActions.addRead({ id: newsApiData.id, newsApiData })
            )
        }
    }, [newsApiData])

    useEffect(() => {
        if (newsApiData && userData) {
            fetchReaded({ userID: userData?.uid, data: newsApiData })
        }
    }, [newsApiData, userData])

    return (
        <div className={s.container}>
            <ScrollbarWrapper>
                <div className={s.card}>
                    {newsApiData ? (
                        <>
                            <div className={s.card__image}>
                                <Image
                                    className={s.image}
                                    height={'100%'}
                                    width={'100%'}
                                    src={newsApiData.image}
                                    fallback={ImageFallback}
                                    preview={false}
                                    alt={`image for ${newsApiData.title}`}
                                    placeholder={
                                        <Image
                                            preview={false}
                                            src={newsApiData.image}
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    }
                                />
                            </div>
                            <div className={s.card__text}>
                                <div>
                                    <h2 className={s.card__news}>
                                        {newsApiData.news}
                                    </h2>
                                    <h3
                                        className={s.card__title}
                                        data-test-id={'post-search-title'}
                                    >
                                        {newsApiData.title}
                                    </h3>
                                    <span>{newsApiData.description}</span>
                                </div>

                                <div className={s.card__footer}>
                                    <div className={s.card__footerInfo}>
                                        <span
                                            className={s.card__date}
                                            data-test-id={'post-search-date'}
                                        >
                                            {converDateIsoToSince(
                                                newsApiData.date
                                            )}
                                        </span>
                                        <LinkUI
                                            className={s.card__link}
                                            to={
                                                isIFrameEnable
                                                    ? `${ClientRoutes.NEWS_FRAME_PATH}${newsApiData.id}`
                                                    : newsApiData.url
                                            }
                                            target={
                                                isIFrameEnable
                                                    ? '_self'
                                                    : '_blank'
                                            }
                                        >
                                            {'Read more...'}
                                        </LinkUI>
                                    </div>
                                    <NewsControlPanel newsData={newsApiData} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <LoaderUI isLoading />
                    )}
                </div>
            </ScrollbarWrapper>
        </div>
    )
}

export default NewsInfo
