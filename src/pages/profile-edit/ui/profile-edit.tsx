import { useGetUserDataQuery, useLazyGetUpdateUserDataQuery } from '@/shared'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { FileImageOutlined, UserOutlined } from '@ant-design/icons'
import { openNotification, useAppDispatch } from '@/shared/lib'
import { Avatar, Button, Form, Input } from 'antd'
import s from './profile-edit.module.scss'
import { accountAction } from '@/features'

type TFieldType = {
    displayName: string
    photoURL: string
}

const ProfileEdit = () => {
    const [form] = Form.useForm()
    const [photo, setPhoto] = useState<string | null>(null)
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const [fetchOnUpdateUserData] = useLazyGetUpdateUserDataQuery()
    const { data } = useGetUserDataQuery()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                displayName: data.displayName,
                photoURL: data.photoURL
            })
            setPhoto(data.photoURL)
        }
    }, [data])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }, [error])

    const onFinish = useCallback(
        (values: TFieldType) => {
            if (
                values.displayName === data.displayName &&
                values.photoURL === data.photoURL
            ) {
                openNotification.error({ description: 'Nothing has changed' })
                return
            }

            const { displayName, photoURL: photo } = values
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
            const isValidUrl = urlRegex.test(photo)
            const photoURL = isValidUrl ? photo : null
            fetchOnUpdateUserData({ displayName, photoURL }).then(
                ({ data }) => {
                    if (data) {
                        dispatch(accountAction.setAccount(data))
                    }
                }
            )
        },
        [data, photo]
    )

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
                    form={form}
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
                            Edit profile
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ProfileEdit
