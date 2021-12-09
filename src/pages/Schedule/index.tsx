import React from 'react'
import { Tabs } from 'antd'
import moment from 'moment'

// components
import { ScheduleOneDay } from 'components/ScheduleOneDay'

// styles
import './Schedule.scss'

const { TabPane } = Tabs

export const lessons = [
    [
        { 
            id: 1,
            from: moment()
                .clone()
                .set('hours', 9)
                .set('minutes', 30)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 11)
                .set('minutes', 0)
                .toISOString(),
            title: 'ООП',
            color: 'aqua'
        },
        { 
            id: 2,
            from: moment()
                .clone()
                .set('hours', 11)
                .set('minutes', 0)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 12)
                .set('minutes', 30)
                .toISOString(),
            title: 'Экономика',
            color: 'gold'
        },
        { 
            id: 3,
            from: moment()
                .clone()
                .set('hours', 12)
                .set('minutes', 30)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 14)
                .set('minutes', 0)
                .toISOString(),
            title: 'Экономика',
            color: 'gold'
        }
    ],
    [
        { 
            id: 1,
            from: moment()
                .clone()
                .set('hours', 9)
                .set('minutes', 30)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 11)
                .set('minutes', 0)
                .toISOString(),
            title: 'БЖД',
            color: 'crimson'
        },
        { 
            id: 2,
            from: moment()
                .clone()
                .set('hours', 11)
                .set('minutes', 0)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 12)
                .set('minutes', 30)
                .toISOString(),
            title: 'БЖД',
            color: 'crimson'
        }
    ],
    [
        { 
            id: 1,
            from: moment()
                .clone()
                .set('hours', 8)
                .set('minutes', 0)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 9)
                .set('minutes', 30)
                .toISOString(),
            title: 'Компьютерные сети',
            color: 'purple'
        },
        { 
            id: 2,
            from: moment()
                .clone()
                .set('hours', 9)
                .set('minutes', 30)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 11)
                .set('minutes', 0)
                .toISOString(),
            title: 'Компьютерные сети',
            color: 'purple'
        },
        { 
            id: 3,
            from: moment()
                .clone()
                .set('hours', 11)
                .set('minutes', 0)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 12)
                .set('minutes', 30)
                .toISOString(),
            title: 'Физ-ра',
            color: 'navy'
        }
    ],
    [],
    [
        { 
            id: 1,
            from: moment()
                .clone()
                .set('hours', 8)
                .set('minutes', 0)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 9)
                .set('minutes', 30)
                .toISOString(),
            title: 'Программирование',
            color: 'lime'
        },
        { 
            id: 2,
            from: moment()
                .clone()
                .set('hours', 9)
                .set('minutes', 30)
                .toISOString(),
            to: moment()
                .clone()
                .set('hours', 11)
                .set('minutes', 0)
                .toISOString(),
            title: 'Программирование',
            color: 'lime'
        }
    ],
    []
]

export const ScheduleContainer: React.FC = () => {
    const days = [
        { id: 1, name: 'Понедельник' },
        { id: 2, name: 'Вторник' },
        { id: 3, name: 'Среда' },
        { id: 4, name: 'Четверг' },
        { id: 5, name: 'Пятница' },
        { id: 6, name: 'Суббота' }
    ]

    return (
        <div className='schedule-tabs'>
            <Tabs defaultActiveKey='1' type='card' size='large'>
                {
                    days.map((day, index) => (
                        <TabPane 
                            tab={day.name} 
                            key={day.id.toString()}
                        >
                            <div className='fade-in'>
                                <ScheduleOneDay 
                                    classes={lessons[index]}
                                />
                            </div>
                        </TabPane>
                    ))
                }
            </Tabs>
        </div>
    )
}