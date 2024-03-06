import { LoaderUI, TNews, useGetArticlesByIdQuery } from '@/shared'
import IframeResizer from 'iframe-resizer-react'
import s from './news-info-frame.module.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NewsInfoFrame = () => {
    const params = useParams()
    const [newsData, setNewsData] = useState<TNews>(null)
    const { data: newsApiData } = useGetArticlesByIdQuery({
        id: parseInt(params.id.slice(1))
    })

    useEffect(() => {
        if (newsApiData) {
            setNewsData(newsApiData)
        }
    }, [newsApiData])

    return (
        <div className={s.container}>
            {newsData ? (
                <IframeResizer
                    className={s.iframe}
                    log
                    src={newsData.url}
                    scrolling
                    style={{ width: '100%', minWidth: '100%', height: '100%' }}
                />
            ) : (
                <LoaderUI isLoading />
            )}
        </div>
    )
}

export default NewsInfoFrame
