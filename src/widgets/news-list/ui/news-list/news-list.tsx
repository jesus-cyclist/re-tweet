import { LoaderUI, ScrollbarWrapper, useGetArticlesQuery } from '@/shared'
import React, { Key, useCallback, useMemo, useState } from 'react'
import { NewsBlock } from '../news-block/news-block'
import { sliceResponseIntoParts } from '../../lib'
import s from './news-list.module.scss'
import { Pagination } from 'antd'

export const NewsList = React.memo(() => {
    const [page, setPage] = useState<number>(1)
    const [offset, setOffset] = useState(0)
    const { data, isSuccess } = useGetArticlesQuery({
        limit: 9,
        offset
    })

    const list = useMemo(() => {
        if (data) {
            const flightApiResponseData = sliceResponseIntoParts(data.results)
            return flightApiResponseData
        }
    }, [data])

    const handleChangePage = useCallback(
        (page: number) => {
            setPage(page)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            setOffset(page * 9)
        },
        [setPage, setOffset]
    )

    const getTotalPage = useMemo(() => {
        if (data) {
            return Math.floor(data.count / 9)
        }
        return 0
    }, [data])

    return (
        <div className={s.container}>
            {isSuccess ? (
                <ScrollbarWrapper>
                    <div className={s.list}>
                        <div className={s.list__content}>
                            {list.map((listItem, i) => {
                                const type = i === 0 ? 1 : i === 1 ? 2 : 3
                                const key: Key = listItem.reduce(
                                    (acc, item) => (acc += item.id),
                                    ''
                                )
                                return (
                                    <NewsBlock
                                        key={key}
                                        type={type}
                                        data={listItem}
                                        isLoading={!isSuccess}
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
            ) : (
                <LoaderUI isLoading />
            )}
        </div>
    )
})

NewsList.displayName = 'NewsList'
