import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ReactNode, useState } from 'react'
import s from './modal.module.scss'
import { Modal } from 'antd'

type TModalUIProps = {
    children: ReactNode
}

export const ModalUI = (props: TModalUIProps): JSX.Element => {
    const { children } = props
    const [isModalOpen, setIsModalOpen] = useState(true)
    const navigate = useNavigate()

    const closeModal = () => {
        setIsModalOpen(false)
        navigate(-1)
    }

    return (
        <Modal
            title={
                <div className={s.header}>
                    <InfoCircleOutlined />

                    <CloseOutlined onClick={closeModal} />
                </div>
            }
            open={isModalOpen}
            centered
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            closeIcon={null}
            className={s.modal}
            onCancel={closeModal}
        >
            {children}
        </Modal>
    )
}
