import React from 'react'
import { Modal } from 'antd'

// utils
import { ModalProps } from 'interfaces/modal'

// components
import { BackButton } from 'components/BackButton'

interface NotificationModalProps extends ModalProps {
    title: string
    content: string
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
    visible,
    setVisible,
    title,
    content
}) => {
    return (
        <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            closeIcon={<div />}
            footer={null}
            destroyOnClose
        >
            <div className='uk-flex uk-flex-between'>
                <p style={{ fontWeight: 'bold' }}>
                    { title }
                </p>

                <BackButton
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <div 
                className='uk-margin-top'
                style={{ fontSize: 20 }}
            >
                { content }
            </div>
        </Modal>
    )
}