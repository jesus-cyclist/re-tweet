import { Alert } from 'antd'

type TErrorUIProps = {
    isError: boolean
    text: string
}

export const ErrorUI = (props: TErrorUIProps) => {
    const { isError, text } = props

    if (isError) {
        return (
            <Alert message='Error' description={text} type='error' showIcon />
        )
    }
}
