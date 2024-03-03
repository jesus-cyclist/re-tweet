import { Toaster, ToastBar } from 'react-hot-toast'
import { WithTheme } from './with-theme'

export const WithToast = () => {
    return (
        <>
            <WithTheme />
            <Toaster>
                {t => (
                    <ToastBar
                        toast={t}
                        style={{
                            ...t.style,
                            animation: t.visible
                                ? 'custom-enter 1s ease'
                                : 'custom-exit 1s ease'
                        }}
                    />
                )}
            </Toaster>
        </>
    )
}
