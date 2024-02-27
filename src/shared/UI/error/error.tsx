import Spaceman from '@/shared/assets/image/space-man.png'
import { FallbackProps } from 'react-error-boundary'
import s from './error.module.scss'
import { Component } from 'react'

export class ErrorUI extends Component<FallbackProps> {
    error: Error
    resetErrorBoundary: () => void

    constructor(props: FallbackProps) {
        super(props)
        this.error = props.error
        this.resetErrorBoundary = props.resetErrorBoundary
    }

    render() {
        return (
            <div className={s.error}>
                <div className={s.error__img}>
                    <img src={Spaceman} alt='spaceman' />
                </div>
                <h2 className={s.error__title}>
                    The command &ldquo;let&apos;s fly&ldquo; was taken too
                    literally. Let&apos;s try again?
                </h2>
                <span className={s.error__text}>{this.error.message}</span>
                <button
                    className={s.error__button}
                    onClick={this.resetErrorBoundary}
                >
                    Try again
                </button>
            </div>
        )
    }
}
