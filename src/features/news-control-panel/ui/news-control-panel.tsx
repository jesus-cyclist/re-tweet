import {
    ClientRoutes,
    LinkUI,
    openNotification,
    useClickOutSide,
    useGetAuthStateQuery,
    useGetFavouritesQuery,
    useGetToggledFavouriteMutation
} from '@/shared'
import {
    BookOutlined,
    CopyOutlined,
    RetweetOutlined,
    SettingOutlined
} from '@ant-design/icons'
import { useCallback, useMemo, useRef, useState } from 'react'
import TelegramIcon from '@/shared/assets/svg/telegram.svg'
import { CSSTransition } from 'react-transition-group'
import s from './news-control-panel.module.scss'
import { useLocation } from 'react-router-dom'
import { useGetTgSharedQuery } from '@/pages'
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
    //mock
    const {
        data: telegramFeature = {
            isTelegramShareEnabled: true
        }
    } = useGetTgSharedQuery()
    const { data: userData } = useGetAuthStateQuery()
    const { data: favouriteData = [] } = useGetFavouritesQuery(userData?.uid, {
        skip: !userData?.uid
    })

    const [fetchToggleFavourite] = useGetToggledFavouriteMutation()
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const location = useLocation()
    const panelRef = useRef<HTMLUListElement | null>(null)
    const buttonRef = useRef<HTMLDivElement | null>(null)

    const isFavourite = useMemo(() => {
        if (userData?.uid) {
            const favouriteCheck = favouriteData.some(
                f => f.data.id === newsData.id
            )
            return favouriteCheck
        }

        return false
    }, [favouriteData, newsData, userData])

    useClickOutSide({
        ref: panelRef,
        cb: (e: Event) => {
            if (buttonRef.current.contains(e.target as Node)) {
                return
            }
            setIsSettingsOpen(false)
        }
    })

    const favouriteToggled = useCallback(async () => {
        if (userData?.uid) {
            await fetchToggleFavourite({ userID: userData.uid, data: newsData })
        } else {
            openNotification.error({
                description: 'You must log in to add to favorites'
            })
        }
    }, [userData])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(newsData.url)
    }

    const showTooltip = () => {
        openNotification.success({ description: 'Copied' })
    }

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
                        left: telegramFeature?.isTelegramShareEnabled
                            ? '-6rem'
                            : '-4.5rem'
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
                    <li className={s.panel__icon} onClick={showTooltip}>
                        <Tooltip
                            placement='topRight'
                            title={'Copy url'}
                            arrow={false}
                            trigger={'hover'}
                            mouseLeaveDelay={0.1}
                        >
                            <CopyOutlined onClick={copyToClipboard} />
                        </Tooltip>
                    </li>
                    <li className={s.panel__icon}>
                        <LinkUI
                            className={s.link__tweet}
                            to={`${ClientRoutes.TWEET_CREATE_PATH}:${newsData.id}`}
                            state={{
                                tweet: location.pathname,
                                from: location.pathname
                            }}
                        >
                            <RetweetOutlined />
                        </LinkUI>
                    </li>
                    {telegramFeature?.isTelegramShareEnabled && (
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
