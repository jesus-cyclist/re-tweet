import {
    LoaderUI,
    useGetUpdateUserDataMutation,
    useGetUserDataQuery
} from '@/shared'
import { FileImageOutlined, UserOutlined } from '@ant-design/icons'
import { ChangeEvent, useCallback, useState } from 'react'
import { Avatar, Button, Form, Input } from 'antd'
import { openNotification } from '@/shared/lib'
import s from './profile-edit.module.scss'

type TFieldType = {
    displayName: string
    photoURL: string
}

const ProfileEdit = () => {
    const [form] = Form.useForm()
    const [photo, setPhoto] = useState<string | null>(null)
    const [fetchOnUpdateUserData] = useGetUpdateUserDataMutation()
    const { data: userData } = useGetUserDataQuery()

    const onFinish = useCallback(
        (values: TFieldType) => {
            if (
                values.displayName === userData.displayName &&
                values.photoURL === userData.photoURL
            ) {
                openNotification.error({ description: 'Nothing has changed' })
                return
            }

            const { displayName, photoURL: photo } = values
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
            const isValidUrl = urlRegex.test(photo)
            const photoURL = isValidUrl ? photo : null
            fetchOnUpdateUserData({ displayName, photoURL })
        },
        [userData, photo]
    )

    const handleChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setPhoto(e.target.value)
        }
    }

    return (
        <div className={s.container}>
            <div className={s.content}>
                {userData ? (
                    <Form
                        name='sign-up'
                        className={s.form}
                        initialValues={{
                            remember: true,
                            displayName: userData.displayName,
                            photoURL: userData.photoURL
                        }}
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
                                onChange={handleChangePhoto}
                            />
                        </Form.Item>

                        <div className={s.form__avatar}>
                            <Avatar
                                src={photo || userData.photoURL}
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
                ) : (
                    <LoaderUI isLoading />
                )}
            </div>
        </div>
    )
}

export default ProfileEdit
