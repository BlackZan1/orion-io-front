import React, { useState } from 'react'
import { 
    AiOutlineDown, 
    AiOutlineSchedule, 
    AiOutlineSetting,
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineFolderOpen
} from 'react-icons/ai'
import { BiHome, BiNews } from 'react-icons/bi'
import { FiUserPlus, FiUsers } from 'react-icons/fi'
import { useHistory } from 'react-router'
import { Popover, Button, Popconfirm } from 'antd'

// utils
import { routes } from 'utils/router'

interface SidebarItemProps {
    isAdmin: boolean
    isOpen: boolean
    isActive: boolean
    deleting: boolean
    setOpen: () => void
    onDelete: () => void
    name: string
    id: string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    isAdmin,
    isOpen,
    isActive,
    deleting,
    setOpen,
    name,
    id,
    onDelete
}) => {
    const history = useHistory()
    const [settings, setSettings] = useState<boolean>(false)

    const { location: { pathname } } = history

    return (
        <div className='main-sidebar__item'>
            <div className='main-sidebar__item__title'>
                <span onClick={setOpen}>
                    { name }
                </span>

                <AiOutlineDown 
                    size={22} 
                    style={{ 
                        transform: `rotate(${isOpen ? 0 : 180}deg)`, 
                        transition: 'all .4s ease'
                    }}
                    className='main-sidebar__item__title__icon' 
                    onClick={setOpen}
                />
            </div>
            
            <div 
                className='main-sidebar__item__items' 
                style={{ 
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                    display: isOpen ? '' : 'none'
                }}
            >
                <div
                    onClick={() => history.push(routes.main.replace(':groupId', id))} 
                    className={`${isActive && pathname.includes('feed') ? 'is-active' : ''}`}
                >
                    <BiHome color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                    <span>Главная</span>
                </div>

                <div
                    onClick={() => history.push(routes.schedule.replace(':groupId', id))} 
                    className={`${isActive && pathname.includes('schedule') ? 'is-active' : ''}`}
                >
                    <AiOutlineSchedule color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                    <span>Расписание</span>
                </div>

                <div
                    onClick={() => history.push(routes.news.replace(':groupId', id))} 
                    className={`${isActive && pathname.includes('news') ? 'is-active' : ''}`}
                >
                    <BiNews color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                    <span>Новости</span>
                </div>

                <div
                    onClick={() => history.push(routes.members.replace(':groupId', id))} 
                    className={`${isActive && pathname.includes('member') ? 'is-active' : ''}`}
                >
                    <FiUsers className='is-stroke-svg' color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                    <span>Участники</span>
                </div>

                <div>
                    <AiOutlineFolderOpen color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                    <span>Занятия</span>
                </div>

                {
                    isAdmin && (
                        <Popover
                            overlayClassName='with-arrow'
                            placement='right'
                            onVisibleChange={(v) => setSettings(v)}
                            trigger='click'
                            overlayInnerStyle={{ width: 240 }}
                            content={(
                                <div className='uk-flex uk-flex-column'>
                                    <Button
                                        type='ghost'
                                        className='uk-margin-small-bottom'
                                        style={{ 
                                            height: 36, 
                                            background: 'var(--white-color)'
                                        }}
                                    >
                                        <div className='uk-flex uk-flex-middle uk-text-small'>
                                            <AiOutlineEdit size={22} />

                                            &nbsp;

                                            Переименовать
                                        </div>
                                    </Button>

                                    <Button
                                        type='ghost'
                                        className='uk-margin-small-bottom'
                                        style={{ 
                                            height: 36, 
                                            background: 'var(--white-color)'
                                        }}
                                        onClick={() => history.push(routes.addMember.replace(':groupId', id))} 
                                    >
                                        <div className='uk-flex uk-flex-middle uk-text-small'>
                                            <FiUserPlus size={22} />

                                            &nbsp;

                                            Добавить участника
                                        </div>
                                    </Button>

                                    <hr style={{ margin: '0 0 10px 0' }} />

                                    <Popconfirm
                                        placement='bottomRight'
                                        title='Вы действительно хотите удалить эту группу?'
                                        okText='Да'
                                        cancelText='Нет'
                                        onConfirm={onDelete}
                                    >
                                        <Button
                                            type='ghost'
                                            className='is-error'
                                            style={{ 
                                                height: 36, 
                                                background: 'var(--white-color)'
                                            }}
                                            loading={deleting}
                                        >
                                            <div className='uk-flex uk-flex-middle error-text uk-text-small'>
                                                <AiOutlineDelete
                                                    size={22} 
                                                    color='crimson' 
                                                />

                                                &nbsp;

                                                Удалить
                                            </div>
                                        </Button>
                                    </Popconfirm>
                                </div>
                            )}
                        >
                            <div
                                onClick={() => setSettings(true)} 
                                className={`${settings ? 'is-active' : ''}`}
                            >
                                <AiOutlineSetting color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                                <span>Настройки</span>
                            </div>
                        </Popover>
                    )
                }
            </div>
        </div>
    )
}