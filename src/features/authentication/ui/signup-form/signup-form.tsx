import {
    FileImageOutlined,
    LockOutlined,
    MailOutlined,
    UserOutlined
} from '@ant-design/icons'
import { ClientRoutes, useGetSignUpMutation } from '@/shared'
import { ChangeEvent, useCallback, useState } from 'react'
import { Avatar, Button, Form, Input } from 'antd'
import { accountAction } from '../../model'
import { NavLink } from 'react-router-dom'
import s from './signup-form.module.scss'
import { useDispatch } from 'react-redux'

type TFieldType = {
    email: string
    password: string
    displayName: string
    photoURL: string
}

export const SignupForm = () => {
    const [photo, setPhoto] = useState<string | null>(null)
    const [fetchOnSignUp] = useGetSignUpMutation()
    const dispatch = useDispatch()

    const onFinish = useCallback((values: TFieldType) => {
        const { email, password, displayName } = values

        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
        const isValidUrl = urlRegex.test(photo)
        const photoURL = isValidUrl ? photo : null

        fetchOnSignUp({ email, password, displayName, photoURL }).then(() =>
            dispatch(accountAction.setIsAuth())
        )
    }, [])

    const handleChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setPhoto(e.target.value)
        }
    }

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
                        name='displayName'
                        rules={[
                            {
                                min: 6,
                                required: true,
                                message: 'Must contain nickname'
                            }
                        ]}
                    >
                        <Input
                            type='text'
                            prefix={
                                <UserOutlined className='site-form-item-icon' />
                            }
                            placeholder='Nickname'
                        />
                    </Form.Item>
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
                                <MailOutlined className='site-form-item-icon' />
                            }
                            placeholder='Email'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                min: 6,
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

                    <Form.Item
                        name='photoURL'
                        rules={[
                            {
                                pattern:
                                    /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                                required: false,
                                message: 'Must contain photo URL'
                            }
                        ]}
                    >
                        <Input
                            type='text'
                            prefix={
                                <FileImageOutlined className='site-form-item-icon' />
                            }
                            placeholder='Photo URL'
                            onBlur={handleChangePhoto}
                        />
                    </Form.Item>

                    <div className={s.form__avatar}>
                        <Avatar
                            src={photo}
                            shape='square'
                            size={64}
                            icon={<UserOutlined />}
                        />
                    </div>

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
