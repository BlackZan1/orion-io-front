import React from 'react'
import { Tag } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import moment from 'moment'

// interfaces
import { NewsData } from 'interfaces/news'

// styles
import './NewsItem.scss'

interface NewsItemProps extends NewsData {}

export const NewsItem: React.FC<NewsItemProps> = ({
    imageUrl,
    author,
    title,
    short,
    details,
    createAt
}) => {
    let date = moment(createAt).fromNow()
    date = date[0].toUpperCase() + date.slice(1)

    return (
        <div className='news-item'>
            <div className='news-item__user-info'>
                <Avatar size={32} src={author.photoUrl} />

                <p className='uk-flex uk-flex-middle'>
                    <span>{ author.firstName }</span>

                    <span>{ author.lastName }</span>

                    <Tag 
                        color={author.role.color}
                        style={{ marginLeft: 8 }}
                    >
                        { author.role.name }
                    </Tag>
                </p>
            </div>

            {
                imageUrl && (
                    <div className='news-item__img'>
                        <img src={imageUrl} alt='error' />
                    </div>
                )
            }

            <div className='news-item__content'>
                <p
                    style={{ borderRadius: imageUrl ? '0 0 7px 7px' : '7px' }}
                >
                    <span className='uk-text-bold'>
                        { title }
                    </span>

                    { details }
                </p>

                <span>
                    { date }
                </span>
            </div>
        </div>
    )
}