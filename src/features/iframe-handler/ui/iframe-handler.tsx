import s from './iframe-handler.module.scss'
import { useIframeState } from '../lib'

export const IFrameHandler = () => {
    const { isIframeEnabled, onToggleFrame } = useIframeState()

    const handleToggleIframe = () => {
        onToggleFrame()
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
