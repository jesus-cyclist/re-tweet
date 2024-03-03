import toast from 'react-hot-toast'

type TNotification = {
    description: string
}

export const openNotification = {
    error: ({ description }: TNotification) => {
        return toast.error(description, {
            duration: 4000,
            position: 'bottom-right',
            icon: '🚫',
            iconTheme: {
                primary: '#000',
                secondary: '#fff'
            },
            ariaProps: {
                role: 'status',
                'aria-live': 'polite'
            }
        })
    },
    success: ({ description }: TNotification) => {
        return toast.success(description, {
            duration: 4000,
            position: 'bottom-right',
            icon: '👏',
            iconTheme: {
                primary: '#000',
                secondary: '#fff'
            },
            ariaProps: {
                role: 'status',
                'aria-live': 'polite'
            }
        })
    }
}
