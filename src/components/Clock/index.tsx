import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import moment from 'moment'

// utils
import { weekDays } from 'utils/dates'

// styles
import './Clock.scss'

export const Clock: React.FC = () => {
    const [time, setTime] = useState<moment.Moment>(moment().clone())

    useEffect(() => {
        setInterval(() => {
            setTime(moment().clone())
        }, 1000)
    }, [])

    const dayOfWeek = weekDays[time.isoWeekday() - 1]

    return (
        <div className='main-clock'>
            <p>
                Время:

                {' '}

                { time.format('HH:mm') }
            </p>
            
            <Tag style={{ margin: 0 }} color='success'>
                { time.format('D MMMM') }
                
                {', '}

                { dayOfWeek }
                .
            </Tag>
        </div>
    )
}