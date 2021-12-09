import React, { useState } from 'react'
import { AiOutlineDown, AiOutlineSchedule } from 'react-icons/ai'
import { BiHome, BiNews } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { useHistory } from 'react-router'

// assets
import { ReactComponent as LogoSVG } from 'assets/logo.svg'

// styles
import './Sidebar.scss'
import { routes } from 'utils/router'

export const Sidebar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(true)
    const history = useHistory()

    const { location: { pathname } } = history

    return (
        <aside className='main-sidebar'>
            <div className='main-sidebar__logo'>
                <LogoSVG /> 
                
                <span>
                    beta v.1
                </span>
            </div>

            <div className='main-sidebar__item'>
                <div className='main-sidebar__item__title'>
                    <span>
                        ПОВТиАС-9-19
                    </span>

                    <AiOutlineDown 
                        size={22} 
                        style={{ transform: `rotate(${open ? 0 : 180}deg)`, transition: 'all .4s ease' }}
                        className='main-sidebar__item__title__icon' 
                        onClick={() => setOpen(!open)}
                    />
                </div>
                
                <div 
                    className='main-sidebar__item__items' 
                    style={{ 
                        height: open ? 'auto' : 0,
                        opacity: open ? 1 : 0,
                        display: open ? '' : 'none'
                    }}
                >
                    <div
                        onClick={() => history.push(routes.main)} 
                        className={`${pathname.includes(routes.main) ? 'is-active' : ''}`}
                    >
                        <BiHome color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                        <span>Главная</span>
                    </div>

                    <div
                        onClick={() => history.push(routes.members)} 
                        className={`${pathname.includes(routes.members) ? 'is-active' : ''}`}
                    >
                        <FiUsers className='is-stroke-svg' color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                        <span>Участники</span>
                    </div>

                    <div
                        onClick={() => history.push(routes.schedule)} 
                        className={`${pathname.includes(routes.schedule) ? 'is-active' : ''}`}
                    >
                        <AiOutlineSchedule color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                        <span>Расписание</span>
                    </div>

                    <div
                        onClick={() => history.push(routes.news)} 
                        className={`${pathname.includes(routes.news) ? 'is-active' : ''}`}
                    >
                        <BiNews color='var(--grey-5-color)' style={{ marginRight: 10 }} size={24} />

                        <span>Новости</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}