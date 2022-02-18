import React from 'react'
import { Button } from 'antd'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'

interface BackButtonProps {
    onClick?: () => void
    isIcon?: boolean
    type?: 'text' | 'ghost'
    style?: React.CSSProperties
}

export const BackButton: React.FC<BackButtonProps> = ({
    onClick = () => null,
    isIcon = false,
    type = 'text',
    style = {}
}) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            style={{ padding: '0 5px', ...style }}
        >
            {
                !isIcon ? (
                    <div className='uk-flex uk-flex-middle'>
                        <AiOutlineArrowLeft size={22} />

                        &nbsp;

                        Назад
                    </div>
                )
                : (
                    <div className='uk-flex uk-flex-middle uk-flex-center'>
                        <AiOutlineClose size={22} />
                    </div>
                )
            }
            
        </Button>
    )
}