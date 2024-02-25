import {
    ErrorUI,
    ScrollbarWrapper,
    TSpaceFlightCard,
    spaceFlightApi
} from '@/shared'
import { Key, useEffect, useMemo, useState } from 'react'
import { NewsBlock } from '../news-block/news-block'
import { sliceResponseIntoParts } from '../../lib'
import s from './news-list.module.scss'
import { Pagination } from 'antd'

type TNewList = Array<TSpaceFlightCard>

export const NewsList = () => {
    const [page, setPage] = useState<number>(1)
    const [offset, setOffset] = useState(0)
    const [list, setList] = useState<Array<TNewList>>([])
    const { data, isFetching, isError, isSuccess } =
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
        setOffset(page * 9)
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

            {isSuccess && (
                <ScrollbarWrapper>
                    <div className={s.list}>
                        <div className={s.list__content}>
                            {list.map((listItem, i) => {
                                const type = (i + 1) as 1 | 2 | 3
                                const key: Key = listItem.reduce(
                                    (acc, item) => (acc += item.id),
                                    ''
                                )
                                return (
                                    <NewsBlock
                                        key={key}
                                        type={type}
                                        data={listItem}
                                        isLoading={isFetching}
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
                </ScrollbarWrapper>
            )}
        </div>
    )
}
