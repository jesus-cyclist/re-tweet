import {
    BookOutlined,
    CopyOutlined,
    RetweetOutlined,
    SettingOutlined
} from '@ant-design/icons'
import { useClickOutSide } from '@/shared/lib/hooks/use-click-outside'
import { authSelectors } from '@/features/authentication'
import { TNews, dbApi, useAppSelector } from '@/shared'
import { CSSTransition } from 'react-transition-group'
import { useEffect, useRef, useState } from 'react'
import s from './news-control-panel.module.scss'
import { selectFavouritesNews } from '@/widgets'
import classNames from 'classnames'
import { Tooltip } from 'antd'

export type TNewsControlPanelProps = {
    newsData: TNews
}

export const NewsControlPanel = (
    props: TNewsControlPanelProps
): JSX.Element => {
    const { newsData } = props
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const userID = useAppSelector(authSelectors.selectAccountID)

    const favourites = useAppSelector(selectFavouritesNews)
    const [isFavourite, setIsFavourite] = useState(false)

    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    const panelRef = useRef<HTMLUListElement | null>(null)
    const buttonRef = useRef<HTMLDivElement | null>(null)

    const [fetch] = dbApi.useGetToggledFavouriteMutation()

    useEffect(() => {
        const favouriteCheck = favourites.some(
            favourute => favourute.data.id === newsData.id
        )
        setIsFavourite(favouriteCheck)
    }, [favourites, newsData])

    useClickOutSide({
        ref: panelRef,
        cb: (e: Event) => {
            if (buttonRef.current.contains(e.target as Node)) {
                return
            }
            setIsSettingsOpen(false)
        }
    })

    const favouriteToggled = async () => {
        await fetch({ userID, data: newsData })
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(newsData.url)
        setIsTooltipVisible(true)
    }

    useEffect(() => {
        if (isTooltipVisible) {
            setTimeout(() => {
                setIsTooltipVisible(false)
            }, 1000)
        }
    }, [isTooltipVisible])

    return (
        <div className={s.container}>
            <div className={s.button} ref={buttonRef}>
                <SettingOutlined
                    onClick={() => setIsSettingsOpen(prev => !prev)}
                />
            </div>

            <CSSTransition
                nodeRef={panelRef}
                in={isSettingsOpen}
                timeout={200}
                classNames={{
                    enter: s.panelEnter,
                    enterDone: s.panelEnterDone
                }}
            >
                <ul className={s.panel} ref={panelRef}>
                    <li className={classNames(s.panel__icon)}>
                        <BookOutlined
                            className={
                                isFavourite ? s.bookmarkActive : s.bookmark
                            }
                            onClick={favouriteToggled}
                        />
                    </li>
                    <li className={s.panel__icon}>
                        <Tooltip
                            open={isTooltipVisible}
                            placement='topRight'
                            title={'Copied!'}
                            arrow={false}
                            trigger={'click'}
                        >
                            <CopyOutlined onClick={copyToClipboard} />
                        </Tooltip>
                    </li>
                    <li className={s.panel__icon}>
                        <RetweetOutlined />
                    </li>
                </ul>
            </CSSTransition>
        </div>
    )
}
