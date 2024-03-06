import {
    CheckUI,
    LinkUI,
    LoaderUI,
    ScrollbarWrapper,
    openNotification,
    useAppSelector,
    useGetArticlesByIdQuery,
    useGetPostTweetMutation
} from '@/shared'
import ImageFallback from '@/shared/assets/image/image_fallback.png'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import NotAnonymous from '@/shared/assets/svg/not-anon.svg'
import Anonymous from '@/shared/assets/svg/anonymous.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import s from './tweet-create.module.scss'
import { selectAccount } from '@/features'
import type { TNews } from '@/shared'
import { Button, Image } from 'antd'

const TweetCreatePage = () => {
    const navigate = useNavigate()
    const [textAreaValue, setTextAreaValue] = useState('')
    const [isAnon, setIsAnon] = useState(true)
    const params = useParams()
    const userData = useAppSelector(selectAccount)
    const [newsData, setNewsData] = useState<TNews>(null)
    const { data: newsApiData } = useGetArticlesByIdQuery({
        id: parseInt(params.id.slice(1))
    })

    const [fetchTweet] = useGetPostTweetMutation()

    useEffect(() => {
        if (newsApiData) {
            setNewsData({
                ...newsApiData,
                date: converDateIsoToSince(newsApiData.date)
            })
        }
    }, [newsApiData])

    const handleChangeTextAreaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(e.target.value)
    }

    const handleChangeCheck = () => {
        setIsAnon(prev => !prev)
    }

    const handlePostTweet = () => {
        if (!textAreaValue) {
            openNotification.error({
                description: 'An empty tweet? Seriously?'
            })
            return
        }

        fetchTweet({
            author: isAnon ? null : userData,
            tweetedPost: newsApiData,
            tweetMessage: textAreaValue,
            hashtags: []
        }).then(() => navigate(-1))
    }

    return (
        <div className={s.container}>
            {newsData ? (
                <ScrollbarWrapper>
                    <div className={s.card}>
                        <TextArea
                            value={textAreaValue}
                            onChange={handleChangeTextAreaValue}
                            className={s.card__textarea}
                            placeholder='Make you tweet'
                            autoSize={{ minRows: 5, maxRows: 5 }}
                        />

                        <div className={s.card__content}>
                            <div className={s.card__image}>
                                <Image
                                    className={s.image}
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
                        </div>
                        <div className={s.footer}>
                            <CheckUI
                                tooltip={
                                    'Your post will be published anonymously...perhaps'
                                }
                                checked={isAnon}
                                change={handleChangeCheck}
                                checkedNode={
                                    <div className={s.svg__check}>
                                        <Anonymous />
                                    </div>
                                }
                                unCheckedNode={
                                    <div className={s.svg__uncheck}>
                                        <NotAnonymous />
                                    </div>
                                }
                            />
                            <Button type='primary' onClick={handlePostTweet}>
                                Post tweet
                            </Button>
                        </div>
                    </div>
                </ScrollbarWrapper>
            ) : (
                <LoaderUI isLoading />
            )}
        </div>
    )
}

export default TweetCreatePage
