import { Checkbox, Tooltip } from 'antd'
import s from './check.module.scss'
import { ReactNode } from 'react'

type Props = {
    tooltip?: string
    isChecked: boolean
    onChange: () => void
    checkedNode: ReactNode
    unCheckedNode: ReactNode
}

export const CheckUI = (props: Props): JSX.Element => {
    const {
        isChecked,
        checkedNode,
        unCheckedNode,
        onChange,
        tooltip = ''
    } = props

    return (
        <div className={s.check}>
            <Tooltip
                placement='topRight'
                title={tooltip}
                arrow={false}
                trigger={'hover'}
            >
                <Checkbox checked={isChecked} onChange={onChange}>
                    {isChecked ? checkedNode : unCheckedNode}
                </Checkbox>
            </Tooltip>
        </div>
    )
}
