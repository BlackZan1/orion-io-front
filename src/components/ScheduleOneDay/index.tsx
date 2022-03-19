import React, { memo, useEffect, useState } from 'react'
import moment from 'moment'

// components
import { ScheduleEvent } from './ScheduleEvent'

// styles
import './ScheduleOneDay.scss'

interface ClassItem {
    id: number
    from: string
    to: string
    lesson: {
        name: string
        color: string
    }
}

interface ScheduleOneDayProps {
    classes: ClassItem[]
    isEditable: boolean
    setEdit?: (data: any) => void
    onDelete?: (id: string) => void
}

export const ScheduleOneDay: React.FC<ScheduleOneDayProps> = memo(({
    classes,
    isEditable,
    setEdit = () => null,
    onDelete = () => null
}) => {
    const startDate = 8
    const time = [
        '8:00',
        '8:30',
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00'
    ]

    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        if(items.length) setItems([])

        classes.forEach((i: any) => {
            const startHours = Math.ceil(moment(i.startDate).hours())
            const endHours = Math.ceil(moment(i.endDate).hours())
            const startMinutes = Math.ceil(moment(i.startDate).minutes())
            const endMinutes = Math.ceil(moment(i.endDate).minutes())

            const distanceTop = (startDate > startHours) ? 0 : startHours - startDate
            const distanceHeight = endHours - startHours

            const gap = (startDate === startHours ? 8 : 0)

            let y = (distanceTop * 96) - gap
            let height = (distanceHeight * 96) + gap

            let yExtra = 0

            for(let x = 1; x <= 60; x++) {
                if(endMinutes === x) {
                    height += 96 / (60 / x) + (x === 40 ? 10 : 0)
                }
            }

            if(startDate <= startHours) {
                for(let x = 1; x <= 60; x++) {
                    if(startMinutes === x) {
                        yExtra = 96 / (60 / x) + (x === 40 ? 10 : 0)
                    }
                }

                y += yExtra
                height -= yExtra
            }
            else height -= ((startDate - startHours) * 96)

            setItems((prev: any) => ([
                ...prev,
                {
                    ...i,
                    y,
                    height,
                    fullTime: `${startHours}:${startMinutes || '00'} - ${endHours}:${endMinutes || '00'}`
                }
            ]))
        })
    }, [classes])

    return (
        <div className='schedule-one-day'>
            {
                time.map((t, index) => (
                    <div className='schedule-one-day__item' key={index}>
                        <span>
                            <span>
                                { t }
                            </span>
                        </span>
                    </div>
                ))
            }

            {
                items.map((i, index) => (
                    <ScheduleEvent
                        { ...i }
                        key={i.id} 
                        index={index} 
                        isEditable={isEditable}
                        setEdit={() => setEdit(i)}
                        onDelete={() => onDelete(i.id)}
                    />
                ))
            }
        </div>
    )
})