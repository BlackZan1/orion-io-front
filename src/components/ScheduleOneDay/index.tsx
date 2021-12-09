import React, { useEffect, useState } from 'react'
import moment from 'moment'

// styles
import './ScheduleOneDay.scss'

interface ClassItem {
    id: number
    from: string
    to: string
    title: string
    color: string
}

export const ScheduleOneDay: React.FC<{ classes: ClassItem[] }> = ({
    classes
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
        if(items.length) return

        classes.forEach((i) => {
            const startHours = Math.ceil(moment(i.from).hours())
            const endHours = Math.ceil(moment(i.to).hours())
            const startMinutes = Math.ceil(moment(i.from).minutes())
            const endMinutes = Math.ceil(moment(i.to).minutes())

            const distanceTop = (startDate > startHours) ? 0 : startHours - startDate
            const distanceHeight = endHours - startHours

            const gap = (startDate === startHours ? 8 : 0)

            let y = (distanceTop * 96) - gap
            let height = (distanceHeight * 96) + gap

            let yExtra = 0

            // if(endMinutes >= 10) {
            //     if(endMinutes >= 20) {
            //         if(endMinutes >= 30) {
            //             if(endMinutes >= 40) {
            //                 if(endMinutes >= 50) {
            //                     height += 96 / (60 / 50)
            //                 }
            //                 else height += 96 / (60 / 40) + 10
            //             }
            //             else height += 96 / (60 / 30)
            //         }
            //         else height += 96 / (60 / 20)
            //     }
            //     else height += 96 / (60 / 10)
            // }
            // else if(endMinutes >= 5) {
            //     height += 96 / (60 / 5)
            // }

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
                    <div 
                        className='schedule-one-day__event' 
                        key={i.id} 
                        style={{ 
                            top: i.y, 
                            height: i.height,
                            zIndex: index + 1
                        }}
                    >
                        <div className='schedule-one-day__event__bg' style={{ background: i.color }} />

                        <div className='schedule-one-day__event__content'>
                            <div className='schedule-one-day__event__content__bar' style={{ background: i.color }} />

                            <span>
                                { i.title }
                                ,

                                &nbsp;

                                { i.fullTime }
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}