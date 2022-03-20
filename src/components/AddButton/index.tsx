import React from 'react'
import { Button } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'

interface AddButtonProps {
    onClick?: () => void
    title: string
    disabled?: boolean
    style?: React.CSSProperties
}

export const AddButton: React.FC<AddButtonProps> = ({
    onClick = () => null,
    title,
    disabled = false,
    style = {}
}) => {
    return (
        <Button
            type='default'
            onClick={onClick}
            style={{ height: 42, ...style }}
            disabled={disabled}
        >
            <div className='uk-flex uk-flex-middle'>
                <AiOutlinePlus size={22} />

                &nbsp;

                { title }
            </div>
        </Button>
    )
}