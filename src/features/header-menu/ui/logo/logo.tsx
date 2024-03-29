import CometSml from '@/shared/assets/image/comet_1.png'
import CometLrg from '@/shared/assets/image/comet_2.png'
import Rocket from '@/shared/assets/image/rocket.png'
import Flame from '@/shared/assets/image/flame.png'
import classNames from 'classnames'
import s from './logo.module.scss'
import { memo } from 'react'

export const Logo = memo(() => {
    return (
        <div className={s.header__link}>
            <div className={s.rocket}>
                <img className={s.rocket__main} src={Rocket} alt={'rocket'} />
                <img className={s.rocket__flame} src={Flame} alt={'flame'} />
            </div>
            <img
                className={classNames(s.comet, s.comet__1)}
                src={CometSml}
                alt='comet'
            />
            <img
                className={classNames(s.comet, s.comet__2)}
                src={CometLrg}
                alt='comet'
            />
            <img
                className={classNames(s.comet, s.comet__3)}
                src={CometSml}
                alt='comet'
            />
            <img
                className={classNames(s.comet, s.comet__4)}
                src={CometLrg}
                alt='comet'
            />
            <span className={s.lines_1}></span>
            <span className={s.lines_2}></span>
            <span className={s.lines_3}></span>
        </div>
    )
})

Logo.displayName = 'Logo'
