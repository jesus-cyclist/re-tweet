import { LoaderUI, useGetArticlesByIdQuery } from '@/shared'
import IframeResizer from 'iframe-resizer-react'
import s from './news-info-frame.module.scss'
import { useParams } from 'react-router-dom'

const NewsInfoFrame = () => {
    const params = useParams()

    const { data: newsApiData } = useGetArticlesByIdQuery({
        id: parseInt(params.id.slice(1))
    })

    return (
        <div className={s.container}>
            {newsApiData ? (
                <IframeResizer
                    className={s.iframe}
                    log
                    src={newsApiData.url}
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
