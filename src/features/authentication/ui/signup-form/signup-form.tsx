import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import { ClientRoutes, dbApi } from '@/shared'
import { useAppDispatch } from '@/shared/lib'
import { accountAction } from '../../model'
import { NavLink } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import s from './signup-form.module.scss'

type TFieldType = {
    email: string
    password: string
}

export const SignupForm = () => {
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const [fetchOnSignUp] = dbApi.useLazyGetSignUpQuery()

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }, [error])

    const onFinish = useCallback((values: TFieldType) => {
        const { email, password } = values
        fetchOnSignUp({ email, password }).then(({ data }) => {
            if (data) {
                const { email, uid } = data
                dispatch(accountAction.setAccount({ email, uid }))
            }
        })
    }, [])

    return (
        <div className={s.container}>
            <div className={s.content}>
                <Form
                    name='sign-up'
                    className={s.form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Must contain email'
                            }
                        ]}
                    >
                        <Input
                            type='email'
                            prefix={
                                <UserOutlined className='site-form-item-icon' />
                            }
                            placeholder='Email'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                // pattern:
                                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                // min: 8,
                                // max: 16,
                                required: true,
                                message:
                                    'Must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit'
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className='site-form-item-icon' />
                            }
                            placeholder='Password'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>

                <div className={s.alternateAction}>
                    <span>Already have an account?</span>
                    <NavLink
                        className={s.alternateAction__link}
                        to={ClientRoutes.SIGNIN_PATH}
                    >
                        Sign in
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
