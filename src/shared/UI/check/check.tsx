import React, { ReactNode, useEffect, useState } from 'react'
import { Checkbox, Tooltip } from 'antd'
import s from './check.module.scss'

type Props = {
    tooltip?: string
    checked: boolean
    change: () => void
    checkedNode: ReactNode
    unCheckedNode: ReactNode
}

export const CheckUI = (props: Props): JSX.Element => {
    const { checked, checkedNode, unCheckedNode, change, tooltip = '' } = props
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    useEffect(() => {
        if (isTooltipVisible) {
            setTimeout(() => {
                setIsTooltipVisible(false)
            }, 2000)
        }
    }, [isTooltipVisible])

    const handleSetTooltipVisible = () => {
        setIsTooltipVisible(true)
    }

    return (
        <div className={s.check}>
            <Tooltip
                open={isTooltipVisible}
                placement='topRight'
                title={tooltip}
                arrow={false}
                trigger={'click'}
            >
                <Checkbox
                    checked={checked}
                    onChange={change}
                    onClick={handleSetTooltipVisible}
                >
                    {checked ? checkedNode : unCheckedNode}
                </Checkbox>
            </Tooltip>
        </div>
    )
}
