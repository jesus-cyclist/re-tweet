import {
    LinkUI,
    LoaderUI,
    ScrollbarWrapper,
    SpaceFlightKeyConverter,
    TSpaceFlightCard,
    spaceFlightApi
} from '@/shared'
import ImageFallback from '@/shared/assets/image/image_fallback.png'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import s from './news-info.module.scss'
import { Image } from 'antd'

const NewsInfo = () => {
    const params = useParams()
    const [newsData, setNewsData] = useState<TSpaceFlightCard>(null)
    const { data } = spaceFlightApi.useGetArticlesByIdQuery({
        id: parseInt(params.id.slice(1))
    })

    useEffect(() => {
        if (data) {
            setNewsData({
                ...data,
                date: SpaceFlightKeyConverter.convertPublishDate(data.date)
            })
        }
    }, [data])
    return (
        <div className={s.container}>
            <ScrollbarWrapper>
                <div className={s.card}>
                    {newsData ? (
                        <>
                            <div className={s.card__image}>
                                <Image
                                    className={s.test}
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
                                <h2 className={s.card__news}>
                                    {newsData.news}
                                </h2>
                                <h3 className={s.card__title}>
                                    {newsData.title}
                                </h3>
                                <span>{newsData.description}</span>
                                <div className={s.card__footer}>
                                    <span className={s.card__date}>
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
