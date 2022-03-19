import React from 'react'
import { Button, Popover } from 'antd'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

interface ScheduleEventProps {
    y: number
    height: number
    index: number
    lesson: {
        color: string
        name: string
    }
    fullTime: string
    description: string
    isEditable: boolean
    setEdit: () => void
    onDelete: () => void
}

export const ScheduleEvent: React.FC<ScheduleEventProps> = ({
    y,
    height,
    index,
    lesson: { name, color },
    fullTime,
    description,
    isEditable,
    setEdit,
    onDelete
}) => {
    const menu = (
        <div className='uk-flex uk-flex-column'>
            <Button
                type='ghost'
                className='uk-margin-small-bottom'
                style={{ 
                    height: 36, 
                    background: 'var(--white-color)'
                }}
                onClick={setEdit}
            >
                <div className='uk-flex uk-flex-middle'>
                    <AiOutlineEdit size={22} />

                    &nbsp;

                    Изменить событие
                </div>
            </Button>

            <Button
                type='ghost'
                className='is-error'
                style={{ 
                    height: 36, 
                    background: 'var(--white-color)'
                }}
                onClick={onDelete}
            >
                <div className='uk-flex uk-flex-middle error-text uk-text-small'>
                    <AiOutlineDelete
                        size={22} 
                        color='crimson' 
                    />

                    &nbsp;

                    Удалить событие
                </div>
            </Button>
        </div>
    )

    const content = (
        <div 
            className='schedule-one-day__event' 
            style={{ 
                top: y, 
                height: height,
                zIndex: index + 1
            }}
        >
            <div 
                className='schedule-one-day__event__bg' 
                style={{ background: color }} 
            />

            <div className='schedule-one-day__event__content'>
                <div 
                    className='schedule-one-day__event__content__bar' 
                    style={{ background: color, marginTop: 2 }} 
                />

                <span>
                    <span 
                        style={{ fontWeight: 700, marginLeft: 5 }}
                    >
                        { name }
                    </span>
                    ,

                    &nbsp;

                    { fullTime }
                    ,

                    &nbsp;

                    { description }
                </span>
            </div>
        </div>
    )

    if(isEditable) {
        return (
            <Popover
                content={menu}
                placement='topRight'
                trigger='click'
                overlayStyle={{ paddingRight: 10 }}
            >
                { content }
            </Popover>
        )
    }

    return content
}