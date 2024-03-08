import { useAppSelector } from '@/shared'
import s from './footer.module.scss'
import { selectors } from '../model'

export const Footer = () => {
    const readedCount = useAppSelector(selectors.selectAll)

    return (
        <div className={s.footer}>
            {readedCount.length ? (
                <h2>You have read {readedCount.length} posts... Wow🚀</h2>
            ) : (
                <h2> Peace, friendship, gum and stars 🚀</h2>
            )}
        </div>
    )
}
