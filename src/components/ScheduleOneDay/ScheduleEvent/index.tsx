import React from 'react'
import { Dropdown, Menu, Popover } from 'antd'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

interface ScheduleEventProps {
    y: number
    height: number
    index: number
    color: string
    title: string
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
    color,
    title,
    fullTime,
    description,
    isEditable,
    setEdit,
    onDelete
}) => {
    const menu = (
        <div>
            <div 
                className='ant-dropdown-menu-item uk-flex uk-flex-middle uk-margin-small-bottom'
                onClick={setEdit}
            >
                <AiOutlineEdit 
                    size={22} 
                    className='uk-margin-small-right' 
                />

                <span className='weight-600'>
                    Изменить событие
                </span>
            </div>

            <div 
                className='ant-dropdown-menu-item uk-flex uk-flex-middle'
                onClick={onDelete}
            >
                <AiOutlineDelete 
                    size={22} 
                    color='crimson' 
                    className='uk-margin-small-right'
                />

                <span className='weight-600' style={{ color: 'crimson' }}>
                    Удалить событие
                </span>
            </div>
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
                        { title }
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
                arrowContent={(<div />)}
                trigger='click'
                overlayStyle={{ paddingRight: 10 }}
            >
                { content }
            </Popover>
        )
    }

    return content
}