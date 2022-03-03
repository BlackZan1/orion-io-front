import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { observer } from 'mobx-react'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { AuditoriesStore } from 'store/auditories'
import { LessonsStore } from 'store/lessons'

// components
import { AddAuditoryModal } from 'components/AddAuditoryModal'
import { AddLessonModal } from 'components/AddLessonModal'
import { SettingsPane } from './SettingsPane'

// styles
import './Settings.scss'

export const SettingsContainer: React.FC = observer(() => {
    const [auditoriesStore] = useState(AuditoriesStore)
    const [lessonsStore] = useState(LessonsStore)

    const [auditoryModal, setAuditoryModal] = useState<boolean>(false)
    const [lessonModal, setLessonModal] = useState<boolean>(false)

    const { rename } = usePageTitle('OrionIO | ')

    const isMobile = window.innerWidth <= 1020

    useEffect(() => {
        rename('Настройки')
    }, [])

    const onSearch = async (value: string, name: 'auditories' | 'lessons', cb: Function) => {
        if(name === 'auditories') await auditoriesStore.search(value)
        else if(name === 'lessons') await lessonsStore.search(value)

        cb()
    }

    const reload = (name: 'auditories' | 'lessons') => {
        if(name === 'auditories') auditoriesStore.getAll()
        else if(name === 'lessons') lessonsStore.getAll()
    }

    return (
        <div className='main-settings__content'>
            <Tabs 
                tabPosition={ isMobile ? 'top' : 'left' }
                defaultActiveKey='1'
                className={ isMobile ? 'uk-margin-top' : 'uk-margin-medium-top'}
                style={{ minHeight: 'calc(100vh - 40px - 118px)' }}
            >
                <Tabs.TabPane key='1' tab='Основные'>

                </Tabs.TabPane>

                <Tabs.TabPane key='2' tab='Аудитории'>
                    <SettingsPane 
                        data={auditoriesStore.data}
                        onSearch={(value, cb) => onSearch(value, 'auditories', cb)}
                        reload={() => reload('auditories')}
                        onAdd={() => setAuditoryModal(true)}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane key='3' tab='Дисциплины'>
                    <SettingsPane 
                        data={lessonsStore.data}
                        onSearch={(value, cb) => onSearch(value, 'lessons', cb)}
                        reload={() => reload('lessons')}
                        onAdd={() => setLessonModal(true)}
                    />
                </Tabs.TabPane>
            </Tabs>

            <AddAuditoryModal 
                visible={auditoryModal}
                setVisible={setAuditoryModal}
            />

            <AddLessonModal 
                visible={lessonModal}
                setVisible={setLessonModal}
            />
        </div>
    )
})