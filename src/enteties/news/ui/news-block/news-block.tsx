import {
    SpaceFlightKeyConverter,
    TSpaceFlightArticleItemResponse
} from '@/shared'
import s from './news-block.module.scss'
import { NewsCard } from '../news-card'
import classNames from 'classnames'

type TNewsBlockProps = {
    type: 1 | 2 | 3
    data: Array<TSpaceFlightArticleItemResponse>
}

export const NewsBlock = (props: TNewsBlockProps): JSX.Element => {
    const { type, data } = props

    switch (type) {
        case 1:
            return (
                <div className={classNames(s.block, s.blockFirst)}>
                    {data.map(data => (
                        <NewsCard
                            key={data.id}
                            data={SpaceFlightKeyConverter.article(data)}
                            type={'background'}
                        />
                    ))}
                </div>
            )

        case 2:
            return (
                <div className={classNames(s.block, s.blockSecond)}>
                    {data.map(data => (
                        <NewsCard
                            key={data.id}
                            data={SpaceFlightKeyConverter.article(data)}
                            type={'background'}
                        />
                    ))}
                </div>
            )

        case 3:
            return (
                <div className={classNames(s.block, s.blockThird)}>
                    {data.map((data, i) => (
                        <NewsCard
                            key={data.id}
                            data={SpaceFlightKeyConverter.article(data)}
                            type={i === 0 ? 'column' : 'background'}
                        />
                    ))}
                </div>
            )
    }
}
