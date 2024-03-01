import { NewsCard } from '../../../../enteties/news/ui/news-card'
import { NewsSkeleton } from '@/enteties/news/ui/news-skeleton'
import { selectReaded } from '@/enteties/news/model/selectors'
import { converDateIsoToSince } from '@/shared/lib/converDate'
import { TNews, useAppSelector } from '@/shared'
import { NewsControlPanel } from '@/features'
import s from './news-block.module.scss'
import classNames from 'classnames'

type TNewsBlockProps = {
    isLoading: boolean
    type: 1 | 2 | 3
    data: Array<TNews>
}

export const NewsBlock = (props: TNewsBlockProps): JSX.Element => {
    const { type, data, isLoading } = props
    const readed = useAppSelector(selectReaded)

    switch (type) {
        case 1:
            return (
                <div className={classNames(s.block, s.blockFirst)}>
                    {data.map(newsData => {
                        const content = isLoading ? (
                            <NewsSkeleton
                                key={newsData.id}
                                type={'background'}
                            />
                        ) : (
                            <NewsCard
                                key={newsData.id}
                                data={{
                                    ...newsData,
                                    date: converDateIsoToSince(newsData.date)
                                }}
                                type={'background'}
                                readStatus={Boolean(readed[newsData.id])}
                            >
                                <NewsControlPanel newsData={newsData} />
                            </NewsCard>
                        )
                        return content
                    })}
                </div>
            )

        case 2:
            return (
                <div className={classNames(s.block, s.blockSecond)}>
                    {data.map(newsData => {
                        const content = isLoading ? (
                            <NewsSkeleton
                                key={newsData.id}
                                type={'background'}
                            />
                        ) : (
                            <NewsCard
                                key={newsData.id}
                                data={{
                                    ...newsData,
                                    date: converDateIsoToSince(newsData.date)
                                }}
                                type={'background'}
                                readStatus={Boolean(readed[newsData.id])}
                            >
                                <NewsControlPanel newsData={newsData} />
                            </NewsCard>
                        )

                        return content
                    })}
                </div>
            )

        case 3:
            return (
                <div className={classNames(s.block, s.blockThird)}>
                    {data.map((newsData, i) => {
                        const content = isLoading ? (
                            <NewsSkeleton
                                key={newsData.id}
                                type={'background'}
                            />
                        ) : (
                            <NewsCard
                                key={newsData.id}
                                data={{
                                    ...newsData,
                                    date: converDateIsoToSince(newsData.date)
                                }}
                                type={i === 0 ? 'column' : 'background'}
                                readStatus={Boolean(readed[newsData.id])}
                            >
                                <NewsControlPanel newsData={newsData} />
                            </NewsCard>
                        )
                        return content
                    })}
                </div>
            )
    }
}
