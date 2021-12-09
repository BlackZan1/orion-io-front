import React from 'react'
import { useParams } from 'react-router'
import { Avatar, Tag } from 'antd'

// styles
import './User.scss'

export const UserContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <div className='user-page__main-info'>
                <Avatar 
                    src='https://pbs.twimg.com/profile_images/1261251796510617600/Ls12DaWX_400x400.jpg' 
                    size={140} 
                    style={{ borderRadius: 12 }}
                />

                <div className='user-page__main-info__right'>
                    <p>Cаалиев Назар</p>

                    <Tag color='warning'>Студент</Tag>
                </div>
            </div>
        </div>
    )
}