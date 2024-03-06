import { useAppDispatch, useAppSelector, useIframeState } from '@/shared'
import { IFrameAction, selectIsIframe } from '../model'
import s from './iframe-handler.module.scss'

export const IFrameHandler = () => {
    const isIFrameEnabled = useAppSelector(selectIsIframe)
    const { isIframeEnabled, toggleIframe } = useIframeState()
    const dispatch = useAppDispatch()

    const handleToggleIframe = () => {
        dispatch(IFrameAction.setIFrame(!isIFrameEnabled))
        toggleIframe()
    }

    return (
        <div className={s.container}>
            <h3>IFrame</h3>
            <div className={!isIframeEnabled ? s.iframeActive : s.iframe}>
                Off
            </div>

            <label className={s.switch}>
                <input
                    checked={isIframeEnabled}
                    className={s.checkbox}
                    type='checkbox'
                    onChange={handleToggleIframe}
                />
                <span className={s.slider} />
            </label>

            <div className={isIframeEnabled ? s.iframeActive : s.iframe}>
                On
            </div>
        </div>
    )
}
