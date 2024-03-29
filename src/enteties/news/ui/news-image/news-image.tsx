import type { TNews } from '@/shared'
import { Image } from 'antd'

type Props = Pick<TNews, 'image' | 'title'> & {
    fallback: string
}

export const NewsImage = (props: Props): JSX.Element => {
    const { image, title, fallback } = props
    return (
        <Image
            height={'100%'}
            width={'100%'}
            src={image}
            fallback={fallback}
            preview={false}
            alt={`image for ${title}`}
            placeholder={
                <Image
                    preview={false}
                    src={fallback}
                    width={'100%'}
                    height={'100%'}
                />
            }
        />
    )
}
