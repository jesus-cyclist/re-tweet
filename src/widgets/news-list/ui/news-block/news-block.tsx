import { SpaceFlightKeyConverter, TSpaceFlightCard } from '@/shared'
import { NewsCard } from '../../../../enteties/news/ui/news-card'
import { NewsSkeleton } from '@/enteties/news/ui/news-skeleton'
import { NewsControlPanel } from '@/features'
import s from './news-block.module.scss'
import classNames from 'classnames'

type TNewsBlockProps = {
    isLoading: boolean
    type: 1 | 2 | 3
    data: Array<TSpaceFlightCard>
}

export const NewsBlock = (props: TNewsBlockProps): JSX.Element => {
    const { type, data, isLoading } = props

    switch (type) {
        case 1:
            return (
                <div className={classNames(s.block, s.blockFirst)}>
                    {data.map(newsItem => {
                        const content = isLoading ? (
                            <NewsSkeleton type={'background'} />
                        ) : (
                            <NewsCard
                                key={newsItem.id}
                                data={{
                                    ...newsItem,
                                    date: SpaceFlightKeyConverter.convertPublishDate(
                                        newsItem.date
                                    )
                                }}
                                type={'background'}
                            >
                                <NewsControlPanel data={newsItem} />
                            </NewsCard>
                        )
                        return content
                    })}
                </div>
            )

        case 2:
            return (
                <div className={classNames(s.block, s.blockSecond)}>
                    {data.map(newsItem => {
                        const content = isLoading ? (
                            <NewsSkeleton type={'background'} />
                        ) : (
                            <NewsCard
                                key={newsItem.id}
                                data={{
                                    ...newsItem,
                                    date: SpaceFlightKeyConverter.convertPublishDate(
                                        newsItem.date
                                    )
                                }}
                                type={'background'}
                            >
                                <NewsControlPanel data={newsItem} />
                            </NewsCard>
                        )

                        return content
                    })}
                </div>
            )

        case 3:
            return (
                <div className={classNames(s.block, s.blockThird)}>
                    {data.map((newsItem, i) => {
                        const content = isLoading ? (
                            <NewsSkeleton type={'background'} />
                        ) : (
                            <NewsCard
                                key={newsItem.id}
                                data={{
                                    ...newsItem,
                                    date: SpaceFlightKeyConverter.convertPublishDate(
                                        newsItem.date
                                    )
                                }}
                                type={i === 0 ? 'column' : 'background'}
                            >
                                <NewsControlPanel data={newsItem} />
                            </NewsCard>
                        )
                        return content
                    })}
                </div>
            )
    }
}
