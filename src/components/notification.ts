import { notifications } from '@mantine/notifications'

type NotificationOptions = {
    title?: string
    message: string
}

export const notify = {
    success: ({title='Thành công', message}: NotificationOptions) => {
        notifications.show({
            title,
            message,
            color: 'green',
        })
    },
    error: ({title='Có lỗi xảy ra', message}: NotificationOptions) => {
        notifications.show({
            title,
            message,
            color: 'red'
        })
    },
    warning: ({title='Cảnh báo', message}: NotificationOptions) => {
        notifications.show({
            title,
            message,
            color: 'yellow'
        })
    },
    info: ({title='Thông tin', message}: NotificationOptions) => {
        notifications.show({
            title,
            message,
            color: 'blue'
        })
    },
}