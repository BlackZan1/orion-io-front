import React, { useEffect, useState } from 'react'
import { Result, Tabs } from 'antd'
import { observer } from 'mobx-react'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { AuditoriesStore } from 'store/auditories'
import { LessonsStore } from 'store/lessons'
import { AdminsStore } from 'store/admins'

// components
import { AddAuditoryModal } from 'components/AddAuditoryModal'
import { AddLessonModal } from 'components/AddLessonModal'
import { SettingsPane } from './SettingsPane'
import { SettingsAdmins } from './SettingsAdmins'
import { SettingsTeachers } from './SettingsTeachers'

// styles
import './Settings.scss'

export const SettingsContainer: React.FC = observer(() => {
    const [auditoriesStore] = useState(AuditoriesStore)
    const [lessonsStore] = useState(LessonsStore)
    const [adminsStore] = useState(AdminsStore)

    const [auditoryModal, setAuditoryModal] = useState<boolean>(false)
    const [lessonModal, setLessonModal] = useState<boolean>(false)

    const [editData, setEditData] = useState<any>({})

    const { rename } = usePageTitle('OrionIO | ')

    const isMobile = window.innerWidth <= 1020

    useEffect(() => {
        rename('Настройки')

        adminsStore.getAll()
    }, [])

    const onSearch = async (value: string, name: 'auditories' | 'lessons', cb: Function) => {
        if(name === 'auditories') await auditoriesStore.search(value)
        else if(name === 'lessons') await lessonsStore.search(value)

        cb()
    }

    const onDelete = (id: string, name: 'auditories' | 'lessons') => {
        if(name === 'auditories') auditoriesStore.delete(id)
        else if(name === 'lessons') lessonsStore.delete(id)
    }

    const reload = (name: 'auditories' | 'lessons') => {
        if(name === 'auditories') auditoriesStore.reset()
        else if(name === 'lessons') lessonsStore.reset()
    }

    return (
        <div className='main-settings__content'>
            <Tabs 
                className='main-settings__content__tabs'
                tabPosition={ isMobile ? 'top' : 'left' }
                defaultActiveKey='1'
                style={{ minHeight: 'calc(100vh - 40px - 118px)' }}
            >
                <Tabs.TabPane key='1' tab='Основные'>
                    <Result 
                        status='403' 
                        title='Скоро добавим!' 
                        subTitle='Вы можете связаться с нами, контакты указаны на главной странице' 
                    />
                </Tabs.TabPane>

                <Tabs.TabPane key='2' tab='Преподаватели'>
                    <SettingsTeachers />
                </Tabs.TabPane>

                <Tabs.TabPane key='3' tab='Методисты'>
                    <SettingsAdmins />
                </Tabs.TabPane>

                <Tabs.TabPane key='4' tab='Аудитории'>
                    <SettingsPane 
                        data={auditoriesStore.data}
                        onSearch={(value, cb) => onSearch(value, 'auditories', cb)}
                        reload={() => reload('auditories')}
                        onDelete={(id) => onDelete(id, 'auditories')}
                        onAdd={() => {
                            setEditData({})
                            setAuditoryModal(true)
                        }}
                        setEditData={(data) => {
                            setEditData(data)
                            setAuditoryModal(true)
                        }}
                        isMore={auditoriesStore.isMore}
                        next={() => auditoriesStore.nextPage()}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane key='5' tab='Дисциплины'>
                    <SettingsPane 
                        data={lessonsStore.data}
                        onSearch={(value, cb) => onSearch(value, 'lessons', cb)}
                        reload={() => reload('lessons')}
                        onDelete={(id) => onDelete(id, 'lessons')}
                        onAdd={() => {
                            setEditData({})
                            setLessonModal(true)
                        }}
                        setEditData={(data) => {
                            setEditData(data)
                            setLessonModal(true)
                        }}
                        isMore={lessonsStore.isMore}
                        next={() => lessonsStore.nextPage()}
                    />
                </Tabs.TabPane>
            </Tabs>

            <AddAuditoryModal 
                visible={auditoryModal}
                setVisible={setAuditoryModal}
                editData={editData}
            />

            <AddLessonModal 
                visible={lessonModal}
                setVisible={setLessonModal}
                editData={editData}
            />
        </div>
    )
})