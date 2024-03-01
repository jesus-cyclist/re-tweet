import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

export const converDateIsoToSince = (date: string) => {
    dayjs.extend(relativeTime)
    const transformedDate = dayjs(date).fromNow()
    return transformedDate
}
