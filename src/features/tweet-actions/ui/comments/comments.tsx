import { CommentOutlined } from '@ant-design/icons'
import s from './comments.module.scss'

export const Comments = () => {
    return (
        <div key={'comment'} className={s.comments}>
            <CommentOutlined key={'comment'} />
            <span className={s.comment__count}>{0}</span>
        </div>
    )
}
