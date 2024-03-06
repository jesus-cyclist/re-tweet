import { ConfigProvider, ThemeConfig } from 'antd'
import { WithToast } from './with-toast'
import { useMemo } from 'react'

export const WithAntd = () => {
    const config: ThemeConfig = useMemo(() => {
        return {
            token: {},
            components: {
                Menu: {
                    itemMarginBlock: 0,
                    itemMarginInline: 0,
                    itemBg: '#ffffff',
                    itemActiveBg: 'var(--content-color)',
                    itemColor: 'var(--highlight-color)',
                    itemHoverBg: 'var(--accent-color)',
                    itemHoverColor: 'var(--link-color)',
                    popupBg: 'var(--primary-color)',
                    subMenuCloseDelay: 0.2,
                    subMenuOpenDelay: 0.2,
                    groupTitleFontSize: 12.8,
                    darkItemSelectedBg: 'var(--link-color)',
                    horizontalItemSelectedColor: 'var(--highlight-color)',
                    itemSelectedColor: 'var(--highlight-color)',
                    itemSelectedBg: 'var(--accent-color)',
                    subMenuItemBorderRadius: 0
                },
                Modal: {
                    contentBg: 'var(--primary-color)',
                    headerBg: 'var(--primary-color)'
                },
                Input: {
                    activeBorderColor: 'var(--highlight-color)',
                    hoverBorderColor: 'var(--highlight-color)'
                },
                Button: {
                    contentFontSize: 16,
                    primaryColor: 'var(--primary-color)',
                    defaultBg: 'var(--content-color)',
                    defaultHoverBg: 'var(--content-color)',
                    defaultHoverBorderColor: 'var(--content-color)',
                    defaultHoverColor: 'var(--primary-color)',
                    defaultActiveBorderColor: 'var(--highlight-color)'
                },
                Pagination: {
                    itemActiveBg: 'var(--highlight-color)',
                    itemActiveColorDisabled: 'var(--highlight-color)'
                },
                Checkbox: {
                    colorPrimary: 'var(--content-color)',
                    colorPrimaryHover: 'var(--content-color)',
                    colorTextDisabled: 'var(--highlight-color)',
                    colorText: 'var(--highlight-color)'
                },
                Card: {
                    actionsBg: 'var(--primary-color)'
                }
            }
        }
    }, [])
    return (
        <ConfigProvider theme={config}>
            <WithToast />
        </ConfigProvider>
    )
}
