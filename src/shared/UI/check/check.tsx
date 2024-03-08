import { Checkbox, Tooltip } from 'antd'
import s from './check.module.scss'
import { ReactNode } from 'react'

type Props = {
    tooltip?: string
    checked: boolean
    change: () => void
    checkedNode: ReactNode
    unCheckedNode: ReactNode
}

export const CheckUI = (props: Props): JSX.Element => {
    const { checked, checkedNode, unCheckedNode, change, tooltip = '' } = props

    return (
        <div className={s.check}>
            <Tooltip
                placement='topRight'
                title={tooltip}
                arrow={false}
                trigger={'hover'}
            >
                <Checkbox checked={checked} onChange={change}>
                    {checked ? checkedNode : unCheckedNode}
                </Checkbox>
            </Tooltip>
        </div>
    )
}
