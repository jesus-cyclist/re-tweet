import {
    ErrorUI,
    LoaderUI,
    TSpaceFlightArticleItemResponse,
    spaceFlightApi
} from '@/shared'
import { getRandomInteger } from '@/shared/lib/getRandomInt'
import { useEffect, useMemo, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { sliceResponseIntoParts } from '../lib'
import s from './news-list.module.scss'
import { NewsBlock } from '@/enteties'
import { Pagination } from 'antd'

type TNewList = Array<TSpaceFlightArticleItemResponse>

export const NewsList = () => {
    const [page, setPage] = useState<number>(1)
    const [offset, setOffset] = useState(0)
    const [list, setList] = useState<Array<TNewList>>([])
    const { data, isLoading, isError, isSuccess } =
        spaceFlightApi.useGetArticlesQuery({
            limit: 9,
            offset
        })

    useEffect(() => {
        if (data) {
            const flightApiResponseData = sliceResponseIntoParts(data.results)
            setList(flightApiResponseData)
        }
    }, [data])

    const handleChangePage = (page: number) => {
        setPage(page)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setOffset(prev => prev + 9)
    }

    const getTotalPage = useMemo(() => {
        if (data) {
            return Math.floor(data.count / 9)
        }
        return 0
    }, [data])

    return (
        <div className={s.container}>
            <ErrorUI isError={isError} text={'Try to reload page.'} />
            <LoaderUI isLoading={isLoading} />

            {isSuccess && (
                // <Scrollbars
                //     className={s.scrollbar}
                //     autoHide
                //     autoHideTimeout={1000}
                //     autoHideDuration={200}
                //     renderTrackVertical={({ ...props }) => (
                //         <div {...props} className={s.scrollbar__track} />
                //     )}
                //     renderThumbVertical={props => (
                //         <div {...props} className={s.scrollbar__thumb} />
                //     )}
                //     renderView={props => <div {...props} className='view' />}
                // >
                <div className={s.list}>
                    <div className={s.list__content}>
                        {list.map(listItem => {
                            const type = getRandomInteger(3, 1) as 1 | 2 | 3
                            const key = listItem.reduce(
                                (acc, item) => (acc += item.id),
                                ''
                            )
                            return (
                                <NewsBlock
                                    key={key}
                                    type={type}
                                    data={listItem}
                                />
                            )
                        })}
                    </div>
                    <div className={s.pagination}>
                        <Pagination
                            showLessItems={true}
                            showSizeChanger={false}
                            onChange={handleChangePage}
                            defaultCurrent={page}
                            total={getTotalPage}
                        />
                    </div>
                </div>
                // </Scrollbars>
            )}
        </div>
    )
}
