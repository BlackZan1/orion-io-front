import React from 'react'
import { Tag } from 'antd'
import moment from 'moment'

// components
import { InfoBlock } from 'components/InfoBlock'
import { ScheduleOneDay } from 'components/ScheduleOneDay'
import { NewsItem } from 'components/NewsItem'

// utils
import { lessons } from 'pages/Schedule'
import { fullWeekDays } from 'utils/dates'

// styles
import './Feed.scss'

export const FeedContainer: React.FC = () => {
    const news = [
        {
            id: 1,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        },
        {
            id: 2,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        },
        {
            id: 3,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        },
        {
            id: 4,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        },
        {
            id: 5,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        },
        {
            id: 6,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        },
        {
            id: 7,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        },
        {
            id: 8,
            text: 'Открываю доступ к сессии за осенний семестр',
            photo: 'https://zvuch.com/img/collections/340290_large.jpg',
            name: 'Жазгуль',
            lastName: 'Сэнсэй'
        }
    ]

    const weekDayIndex = moment().isoWeekday() - 1
    
    return (
        <>
            <InfoBlock 
                title='🧠 Добро пожаловать, Назар!'
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
                                { lessons[weekDayIndex].length } 
                                
                                {' '}

                                занятия
                            </Tag>

                            :

                            &nbsp;

                            {
                                lessons[weekDayIndex].map((lesson, index) => (
                                    <>
                                        <Tag 
                                            color={lesson.color} 
                                            style={{ marginLeft: 4, marginRight: 0, fontSize: 14 }}
                                        >
                                            { lesson.title }
                                        </Tag>

                                        {
                                            (index + 1) !== lessons[weekDayIndex].length && (
                                                ', '
                                            )
                                        }
                                    </>
                                ))
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
                            classes={lessons[weekDayIndex]}
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
}