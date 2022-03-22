import React from 'react'
import { Button, Popover } from 'antd'
import { observer } from 'mobx-react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEllipsis } from 'react-icons/ai'

// interfaces
import { LessonState } from 'interfaces/lessons'
import { UserData } from 'interfaces/users'

// styles
import './LessonItem.scss'

interface LessonItemProps {
    lesson: LessonState
    lector: UserData
    id: string
    isEditable: boolean
    onDelete: () => void
    setEdit: () => void
}

export const LessonItem: React.FC<LessonItemProps> = observer(({
    lesson,
    lector,
    isEditable,
    onDelete,
    setEdit
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

                    Изменить занятие
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

                    Удалить занятие
                </div>
            </Button>
        </div>
    )

    return (
        <div className='lesson-item'>
            <div     
                className='lesson-item__bg' 
                style={{ backgroundColor: lesson.color }}
            />

            <div className='lesson-item__content'>
                <div 
                    className='lesson-item__content__bar' 
                    style={{ backgroundColor: lesson.color, marginBottom: 15 }}   
                />

                <p style={{ marginBottom: 3 }}>
                    Дисциплина:
                </p>

                <p className='lesson-item__content__title'>
                    { lesson.name }
                </p>

                <p style={{ marginBottom: 3, marginTop: 7 }}>
                    Преподаватель:
                </p>

                <p className='lesson-item__content__title'>
                    { `${lector.firstName} ${lector.lastName} (${lector.phone})` }
                </p>

                {
                    isEditable && (
                        <Popover
                            content={menu}
                            placement='bottomRight'
                            trigger='click'
                        >
                            <div className='lesson-item__content__icon uk-flex uk-flex-middle uk-flex-center'>
                                <AiOutlineEllipsis size={24} />
                            </div>
                        </Popover>
                    )
                }
            </div>
        </div>
    )
})