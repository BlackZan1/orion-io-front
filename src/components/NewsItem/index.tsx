import { Tag } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'

// styles
import './NewsItem.scss'

export const NewsItem: React.FC<any> = ({
    ...data
}) => {
    return (
        <div className='news-item'>
            <div className='news-item__user-info'>
                <Avatar size={28} src={data.photo} />

                <p>
                    <span>{ data.name }</span>

                    <span>{ data.lastName }</span>

                    <Tag 
                        color='processing'
                        style={{ marginLeft: 8 }}
                    >
                        Куратор
                    </Tag>
                </p>
            </div>

            <div className='news-item__content'>
                <p>{ data.text }</p>

                <span>Сегодня, 10:50</span>
            </div>
        </div>
    )
}