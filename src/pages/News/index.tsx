import React from 'react'
import { Button, DatePicker } from 'antd'

// components
import { NewsItem } from 'components/NewsItem'

// styles
import './News.scss'

export const NewsContainer: React.FC = () => {
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

    return (
        <div className='news-block'>
            <div className='news-block__btns'>
                <Button type='primary' style={{ height: 42, marginRight: 10 }}>
                    Сегодня
                </Button>

                <Button type='ghost' style={{ height: 42, marginRight: 10 }}>
                    Вчера
                </Button>

                <DatePicker 
                    style={{ height: 42 }}
                />
            </div>

            <div className='news-block__list'>
                {
                    news.map((i) => (
                        <NewsItem { ...i } key={i.id} />
                    ))
                }
            </div>
        </div>
    )
}