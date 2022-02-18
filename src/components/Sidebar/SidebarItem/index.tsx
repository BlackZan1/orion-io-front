import React from 'react'
import { AiOutlineDown, AiOutlineSchedule, AiOutlineSetting } from 'react-icons/ai'
import { BiHome, BiNews } from 'react-icons/bi'
import { FiUserPlus, FiUsers } from 'react-icons/fi'
import { useHistory } from 'react-router'

// utils
import { routes } from 'utils/router'

interface SidebarItemProps {
    isAdmin: boolean
    isOpen: boolean
    isActive: boolean
    setOpen: () => void
    name: string
    id: string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    isAdmin,
    isOpen,
    isActive,
    setOpen,
    name,
    id
}) => {
    const history = useHistory()

    const { location: { pathname } } = history

    return (
        <div className='main-sidebar__item'>
            <div className='main-sidebar__item__title'>
                <span onClick={setOpen}>
                    { name }
                </span>

                <AiOutlineDown 
                    size={22} 
                    style={{ transform: `rotate(${isOpen ? 0 : 180}deg)`, transition: 'all .4s ease' }}
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
                    className={`${isActive && pathname.includes('members') ? 'is-active' : ''}`}
                >
                    <FiUsers className='is-stroke-svg' color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                    <span>Участники</span>
                </div>

                {
                    isAdmin && (
                        <div
                            onClick={() => history.push(routes.groupSettings.replace(':groupId', id))} 
                            className={`${isActive && pathname.includes('settings') ? 'is-active' : ''}`}
                        >
                            <AiOutlineSetting color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                            <span>Настройки</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}