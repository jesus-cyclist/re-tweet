import { useLocation, useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import { ReactNode, useState } from 'react'
import s from './modal.module.scss'
import { Modal } from 'antd'

type Props = {
    children: ReactNode
}

export const ModalUI = (props: Props): JSX.Element => {
    const { children } = props
    const [isModalOpen, setIsModalOpen] = useState(true)
    const location = useLocation()
    const state = location.state
    const navigate = useNavigate()

    const closeModal = () => {
        setIsModalOpen(false)
        navigate(state.from || -1)
    }

    return (
        <Modal
            title={
                <div className={s.header}>
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
            footer={null}
        >
            {children}
        </Modal>
    )
}
