import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import moment from 'moment'
import { observer } from 'mobx-react'

// components
import { InfoBlock } from 'components/InfoBlock'
import { ScheduleOneDay } from 'components/ScheduleOneDay'
import { NewsItem } from 'components/NewsItem'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// utils
import { fullWeekDays } from 'utils/dates'

// stores
import { AuthStore } from 'store/auth'
import { ScheduleStore } from 'store/schedule'
import { StudySpaceStore } from 'store/studySpace'

// styles
import './Feed.scss'

export const FeedContainer: React.FC = observer(() => {
    const [studyStore] = useState(StudySpaceStore)
    const [authStore] = useState(AuthStore)
    const [scheduleStore] = useState(ScheduleStore)
    const { rename } = usePageTitle('')

    const { schedule: scheduleId } = studyStore.activeGroup

    useEffect(() => {
        if(scheduleStore.data.id !== scheduleId) {
            scheduleStore.getById(scheduleId)
        }
    }, [scheduleId])

    useEffect(() => {
        rename(`${studyStore.activeGroup.name} | Главная страница`)
    }, [])

    const news = [
        {
            id: 1,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        },
        {
            id: 2,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        },
        {
            id: 3,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        },
        {
            id: 4,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        },
        {
            id: 5,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        },
        {
            id: 6,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        },
        {
            id: 7,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        },
        {
            id: 8,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Эже'
        }
    ]

    const lessons = scheduleStore.loaded ? scheduleStore.lessons : []
    const { user } = authStore

    const weekDayIndex = moment().isoWeekday() - 1
    const lessonsLength = lessons.length && lessons[weekDayIndex].length
    const currentLesson = lessons[weekDayIndex] || []

    return (
        <>
            <InfoBlock 
                title={`🧠 Добро пожаловать, ${user.firstName}!`}
                content={(
                    <>
                        <p>
                            Сегодня 
                            
                            <Tag 
                                color='success' 
                                style={{ marginLeft: 4, marginRight: 0, fontSize: 14 }}
                            >
                                { moment().format('DD MMMM, ') }

                                { fullWeekDays[weekDayIndex] }
                            </Tag>
                        </p>

                        <p>
                            У вас по расписанию 

                            <Tag 
                                color='processing' 
                                style={{ marginLeft: 4, marginRight: 2, fontSize: 14 }}
                            >
                                { lessonsLength } 
                                
                                {' '}

                                занятия
                            </Tag>

                            {
                                !!lessonsLength && (
                                    <>
                                        :

                                        &nbsp;

                                        {
                                            currentLesson.map((lesson: any, index: number) => (
                                                <>
                                                    <Tag 
                                                        color={lesson.color} 
                                                        style={{ 
                                                            marginLeft: 4, 
                                                            marginRight: 0, 
                                                            fontSize: 14 
                                                        }}
                                                    >
                                                        { lesson.title }
                                                    </Tag>

                                                    {
                                                        (index + 1) !== lessonsLength && (
                                                            ', '
                                                        )
                                                    }
                                                </>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </p>
                    </>
                )}
            /> 

            <div className='feed__grid' style={{ marginTop: 20 }}>
                <InfoBlock 
                    title='Расписание на сегодня'
                    withHeader
                    content={(
                        <ScheduleOneDay 
                            classes={currentLesson}
                            isEditable={false}
                        />
                    )}
                /> 

                <InfoBlock 
                    title='Недавние новости'
                    withHeader
                    bodyStyle={{ padding: 0 }}
                    content={(
                        <div style={{ overflowY: 'auto', padding: '20px 20px 10px 20px', maxHeight: 550 }}>
                            {
                                news.map((i) => (
                                    <NewsItem { ...i } key={i.id} />
                                ))
                            }
                        </div>
                    )}
                />
            </div>
        </>
    )
})