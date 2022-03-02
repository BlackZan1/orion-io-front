import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Button, notification } from 'antd'
import { AiOutlineMenu, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai'

// components
import { AddGroupModal } from 'components/AddGroupModal'

// stores
import { StudySpaceStore } from 'store/studySpace'
import { AuthStore } from 'store/auth'

// assets
import { ReactComponent as LogoSVG } from 'assets/logo.svg'

// utils
import { routes } from 'utils/router'

// components
import { SidebarItem } from './SidebarItem'

// styles
import './Sidebar.scss'

export const Sidebar: React.FC = observer(() => {
    const history = useHistory()

    const [studyStore] = useState(StudySpaceStore)
    const [authStore] = useState(AuthStore)

    const [modal, setModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const { groups } = studyStore.data
    const { activeGroupId } = studyStore
    const { id: selectedGroupId } = studyStore.activeGroup

    const setActiveGroupId = (id: string) => studyStore.setActiveGroupId(id)

    const deleteGroup = async (id: string) => {
        setLoading(true)

        await studyStore.deleteGroup(id)

        setLoading(false)

        notification.success({
            message: 'Успешно удаленно!',
            description: 'Вы можете снова добавить новую группу попозже.'
        })
    }

    return (
        <>
            <aside className='main-sidebar' style={{ left: open ? '0px' : '' }}>
                <div className='main-sidebar__logo'>
                    <LogoSVG /> 
                    
                    <span>
                        beta v.1
                    </span>
                </div>

                <div 
                    className='main-sidebar__list'
                    style={{ height: authStore.isAdmin ? 'calc(100% - 110px - 80px)' : 'calc(100% - 80px)' }}
                >
                    {
                        groups && groups.map((group: any) => {
                            const isSimilar = group.id === activeGroupId
                            const isActive = group.id === selectedGroupId

                            return (
                                <SidebarItem 
                                    key={group.id} 
                                    { ...group } 
                                    isActive={isActive}
                                    isOpen={isSimilar}
                                    isAdmin={authStore.isAdmin}
                                    setOpen={() => setActiveGroupId(isSimilar ? '' : group.id)}
                                    onDelete={() => deleteGroup(group.id)}
                                    deleting={loading}
                                />
                            )
                        })
                    }
                </div>

                {
                    authStore.isAdmin && (
                        <>
                            <div className='main-sidebar__end'>
                                <Button 
                                    type='ghost'
                                    style={{ height: 36, fontSize: 14, width: '100%' }}
                                    onClick={() => setModal(true)}
                                >
                                    <div className='uk-flex uk-flex-middle'>
                                        <AiOutlinePlus size={22} className='uk-margin-small-right' />

                                        Добавить группу
                                    </div>
                                </Button>

                                <Button 
                                    type='ghost'
                                    style={{ height: 36, fontSize: 14, width: '100%' }}
                                    onClick={() => history.push(routes.studySpace.settings)}
                                >
                                    <div className='uk-flex uk-flex-middle'>
                                        <AiOutlineSetting size={22} className='uk-margin-small-right' />

                                        Настройки
                                    </div>
                                </Button>
                            </div>

                            <AddGroupModal
                                visible={modal}
                                setVisible={setModal}
                            />
                        </>
                    )
                }
            </aside>

            <div 
                className='main-sidebar-mask' 
                style={{ opacity: open ? '1' : '', zIndex: open ? 8 : -1 }} 
                onClick={() => setOpen(!open)}
            />

            <aside className='main-sidebar-mobile'>
                <div className='main-sidebar-mobile__btn uk-flex uk-flex-center uk-flex-middle'>
                    <AiOutlineMenu 
                        size={24} 
                        onClick={() => setOpen(!open)} 
                    />
                </div>
            </aside>
        </>
    )
})