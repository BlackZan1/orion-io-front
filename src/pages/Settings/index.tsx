import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { observer } from 'mobx-react'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { AuditoriesStore } from 'store/auditories'
import { LessonsStore } from 'store/lessons'

// components
import { SettingsPane } from './SettingsPane'

// styles
import './Settings.scss'

export const SettingsContainer: React.FC = observer(() => {
    const [auditoriesStore] = useState(AuditoriesStore)
    const [lessonsStore] = useState(LessonsStore)

    const { rename } = usePageTitle('OrionIO | ')

    const isMobile = window.innerWidth <= 1020

    useEffect(() => {
        rename('Настройки')
    }, [])

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
                    />
                </Tabs.TabPane>

                <Tabs.TabPane key='3' tab='Дисциплины'>
                    <SettingsPane 
                        data={lessonsStore.data}
                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
})