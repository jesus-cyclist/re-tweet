import {
    ClientRoutes,
    LinkUI,
    openNotification,
    useAppSelector,
    useGetToggledFavouriteMutation
} from '@/shared'
import {
    BookOutlined,
    CopyOutlined,
    RetweetOutlined,
    SettingOutlined
} from '@ant-design/icons'
import TelegramIcon from '@/shared/assets/svg/telegram.svg'
import { selectAccountID } from '@/features/authentication'
import { useLocation, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useEffect, useRef, useState } from 'react'
import { selectIsTgShareEnabled } from '../model'
import s from './news-control-panel.module.scss'
import { selectFavouritesNews } from '@/widgets'
import { useClickOutSide } from '@/shared'
import type { TNews } from '@/shared'
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
    const userID = useAppSelector(selectAccountID)
    const navigate = useNavigate()

    const favourites = useAppSelector(selectFavouritesNews)
    const [isFavourite, setIsFavourite] = useState(false)

    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    const panelRef = useRef<HTMLUListElement | null>(null)
    const buttonRef = useRef<HTMLDivElement | null>(null)

    const isTelegramShareEnabled = useAppSelector(selectIsTgShareEnabled)

    const location = useLocation()

    const [fetch] = useGetToggledFavouriteMutation()

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
        if (userID) {
            await fetch({ userID, data: newsData })
        } else {
            openNotification.error({
                description: 'You must log in to add to favorites'
            })
            navigate(ClientRoutes.SIGNIN_PATH)
        }
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
            <div
                className={s.button}
                ref={buttonRef}
                data-test-id={'open-panel-button'}
                onClick={() => setIsSettingsOpen(prev => !prev)}
            >
                <SettingOutlined />
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
                <ul
                    className={s.panel}
                    ref={panelRef}
                    style={{
                        left: isTelegramShareEnabled ? '-6rem' : '-4.5rem'
                    }}
                >
                    <li
                        className={classNames(s.panel__icon)}
                        data-test-id={'toggle-favourite-button'}
                    >
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
                        <LinkUI
                            className={s.link__tweet}
                            to={`${ClientRoutes.TWEET_CREATE_PATH}:${newsData.id}`}
                            state={{ tweet: location.pathname }}
                        >
                            <RetweetOutlined />
                        </LinkUI>
                    </li>
                    {isTelegramShareEnabled && (
                        <li className={s.panel__icon}>
                            <LinkUI
                                to={`https://t.me/share/url?url=${newsData.url}&text=${newsData.title}`}
                                target='_blank'
                                className={s.panel__tg}
                            >
                                <TelegramIcon />
                            </LinkUI>
                        </li>
                    )}
                </ul>
            </CSSTransition>
        </div>
    )
}
