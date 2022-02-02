import React, { useEffect, useState } from 'react'
import { Spin, Tabs } from 'antd'
import moment from 'moment'
import { observer } from 'mobx-react'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// components
import { ScheduleOneDay } from 'components/ScheduleOneDay'
import { AddButton } from 'components/AddButton'
import { AddEventModal } from 'components/AddEventModal'

// stores
import { StudySpaceStore } from 'store/studySpace'
import { ScheduleStore } from 'store/schedule'
import { AuthStore } from 'store/auth'

// utils
import { Days } from 'constants/days'

// styles
import './Schedule.scss'

const { TabPane } = Tabs

export const ScheduleContainer: React.FC = observer(() => {
    const [studyStore] = useState(StudySpaceStore)
    const [scheduleStore] = useState(ScheduleStore)
    const [authStore] = useState(AuthStore)
    const { rename } = usePageTitle('')

    const [modal, setModal] = useState<boolean>(false)
    const [editData, setEditData] = useState<any>({})

    const { schedule: scheduleId } = studyStore.activeGroup
    const { loaded: isLoaded } = scheduleStore

    useEffect(() => {
        scheduleStore.getById(scheduleId)
    }, [scheduleId])

    useEffect(() => {
        rename(`${studyStore.activeGroup.name} | Расписание`)
    }, [])

    const editDataAction = (newData: any) => {
        setEditData(newData)
        setModal(true)
    }

    const onClickHandler = () => {
        setEditData({})
        setModal(true)
    }

    const deleteEvent = (eventId: string) => {
        scheduleStore.deleteEvent(eventId)
    }

    return (
        <div className='schedule-tabs'>
            {
                authStore.isAdmin && (
                    <div className='schedule-tabs__btn'>
                        <AddButton 
                            title='Добавить событие' 
                            onClick={onClickHandler}
                        />
                    </div>
                )
            }

            <Spin
                spinning={!isLoaded}
                size='large'
            >
                <Tabs 
                    defaultActiveKey={moment().isoWeekday().toString()}
                    type='card' 
                    size='large'
                    className={`${!isLoaded ? '' : 'uk-margin-top'} ${authStore.isAdmin ? 'is-admin' : ''}`}
                >
                    {
                        Days.map((day, index) => (
                            <TabPane 
                                tab={day.name} 
                                key={day.id.toString()}
                            >
                                <ScheduleOneDay 
                                    isEditable={authStore.isAdmin}
                                    classes={scheduleStore.lessons[index] || []}
                                    setEdit={editDataAction}
                                    onDelete={deleteEvent}
                                />
                            </TabPane>
                        ))
                    }
                </Tabs>
            </Spin>

            <AddEventModal 
                visible={modal}
                setVisible={setModal}
                editData={editData}
            />
        </div>
    )
})