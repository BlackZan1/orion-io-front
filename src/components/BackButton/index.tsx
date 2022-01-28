import React from 'react'
import { Button } from 'antd'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface BackButtonProps {
    onClick?: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({
    onClick = () => null
}) => {
    return (
        <Button
            type='text'
            onClick={onClick}
            style={{ padding: '0 5px' }}
        >
            <div className='uk-flex uk-flex-middle'>
                <AiOutlineArrowLeft size={22} />

                &nbsp;

                Назад
            </div>
        </Button>
    )
}