import { ClientRoutes, FirebaseAuth, FirebaseErrorHandler } from '@/shared'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Space } from 'antd'
import { useAppDispatch } from '@/shared/lib'
import { FirebaseError } from 'firebase/app'
import { accountAction } from '../../model'
import { NavLink } from 'react-router-dom'
import s from './signup-form.module.scss'

type TFieldType = {
    email: string
    password: string
}

export const SignupForm = () => {
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }, [error])

    const onFinish = useCallback((values: TFieldType) => {
        const { email, password } = values

        FirebaseAuth.signUp(email, password)
            .then(({ user }) => {
                const { email, uid } = user
                dispatch(accountAction.setAccount({ email, uid }))
            })
            .catch((error: FirebaseError) => {
                const errorMessage = FirebaseErrorHandler.getError(error)
                setError(errorMessage)
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
                                pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                min: 8,
                                max: 16,
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
                <div className={s.error}>
                    {error && (
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <Alert message={error} type='error' />
                        </Space>
                    )}
                </div>
            </div>
        </div>
    )
}
