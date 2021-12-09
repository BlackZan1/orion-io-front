import React from 'react'
import { Tag } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { useHistory } from 'react-router'

// utils
import { routes } from 'utils/router'

// styles
import './UserInfo.scss'

export const UserInfo: React.FC = () => {
    const history = useHistory()

    return (
        <div 
            className='user-info' 
            onClick={() => history.push(routes.user.replace(':id', '1'))}
        >
            <div>
                <p>Назар Саалиев</p>

                <Tag color='warning'>Студент</Tag>
            </div>

            <Avatar size={40} src='https://pbs.twimg.com/profile_images/1261251796510617600/Ls12DaWX_400x400.jpg' />
        </div>
    )
}