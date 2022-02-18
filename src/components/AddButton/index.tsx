import React from 'react'
import { Button } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'

interface AddButtonProps {
    onClick?: () => void
    title: string
    disabled?: boolean
}

export const AddButton: React.FC<AddButtonProps> = ({
    onClick = () => null,
    title,
    disabled = false
}) => {
    return (
        <Button
            type='default'
            onClick={onClick}
            style={{ height: 42 }}
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