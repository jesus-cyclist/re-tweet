import { notification } from 'antd'

type TNotification = {
    message: string
    description: string
}

export const openNotification = {
    error: ({ description }: Pick<TNotification, 'description'>) => {
        notification.error({
            message: 'Error',
            description
        })
    },
    info: ({ description }: Pick<TNotification, 'description'>) => {
        notification.info({
            message: 'Info',
            description
        })
    },
    warning: ({ description }: Pick<TNotification, 'description'>) => {
        notification.warning({
            message: 'Warning',
            description
        })
    },
    success: ({ description }: Pick<TNotification, 'description'>) => {
        notification.success({
            message: 'Success',
            description
        })
    }
}
