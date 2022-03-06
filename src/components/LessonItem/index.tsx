import { Button, Popover } from 'antd'
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEllipsis } from 'react-icons/ai'

// styles
import './LessonItem.scss'

export const LessonItem: React.FC<any> = ({
    lesson,
    lector,
    isEditable
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
                // onClick={setEdit}
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
                // onClick={onDelete}
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
                    { lector }

                    {' (0555-745-042)'}
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
}