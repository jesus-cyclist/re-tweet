import {
    LinkUI,
    LoaderUI,
    ScrollbarWrapper,
    TNews,
    dbApi,
    spaceFlightApi,
    useAppSelector
} from '@/shared'
import ImageFallback from '@/shared/assets/image/image_fallback.png'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authSelectors } from '@/features'
import s from './news-info.module.scss'
import { Image } from 'antd'

const NewsInfo = () => {
    const params = useParams()
    const userID = useAppSelector(authSelectors.selectAccountID)
    const [newsData, setNewsData] = useState<TNews>(null)
    const { data: spaceFlightData } = spaceFlightApi.useGetArticlesByIdQuery({
        id: parseInt(params.id.slice(1))
    })

    const [fetch] = dbApi.useGetAddReadedStatusMutation()

    useEffect(() => {
        if (spaceFlightData) {
            setNewsData({
                ...spaceFlightData,
                date: converDateIsoToSince(spaceFlightData.date)
            })
        }
    }, [spaceFlightData])

    useEffect(() => {
        if (spaceFlightData && userID) {
            fetch({ userID, data: spaceFlightData })
        }
    }, [spaceFlightData, userID])

    return (
        <div className={s.container}>
            <ScrollbarWrapper>
                <div className={s.card}>
                    {newsData ? (
                        <>
                            <div className={s.card__image}>
                                <Image
                                    className={s.image}
                                    height={'100%'}
                                    width={'100%'}
                                    src={newsData.image}
                                    fallback={ImageFallback}
                                    preview={false}
                                    alt={`image for ${newsData.title}`}
                                    placeholder={
                                        <Image
                                            preview={false}
                                            src={newsData.image}
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    }
                                />
                            </div>
                            <div className={s.card__text}>
                                <div>
                                    <h2 className={s.card__news}>
                                        {newsData.news}
                                    </h2>
                                    <h3
                                        className={s.card__title}
                                        data-test-id={'post-search-title'}
                                    >
                                        {newsData.title}
                                    </h3>
                                    <span>{newsData.description}</span>
                                </div>

                                <div className={s.card__footer}>
                                    <span
                                        className={s.card__date}
                                        data-test-id={'post-search-date'}
                                    >
                                        {newsData.date}
                                    </span>
                                    <LinkUI
                                        className={s.card__link}
                                        to={newsData.url}
                                        target={'_blank'}
                                    >
                                        {'Read more...'}
                                    </LinkUI>
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
