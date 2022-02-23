import React from 'react'
import { Tag } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import moment from 'moment'
import { useHistory } from 'react-router'

// interfaces
import { NewsData } from 'interfaces/news'

// utils
import { routes } from 'utils/router'

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
    const history = useHistory()

    let date = moment(createAt).fromNow()
    date = date[0].toUpperCase() + date.slice(1)

    return (
        <div className='news-item'>
            <div 
                className='news-item__user-info' 
                onClick={() => history.push(routes.user.replace(':id', author.id))}
            >
                <Avatar 
                    size={32} 
                    src={author.photoUrl} 
                    style={{ cursor: 'pointer' }}
                />

                <p 
                    className='uk-flex uk-flex-middle'
                    style={{ cursor: 'pointer' }}
                >
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