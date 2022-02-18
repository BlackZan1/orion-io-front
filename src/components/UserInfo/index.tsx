import React, { useState } from 'react'
import { Tag } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'

// stores
import { AuthStore } from 'store/auth'

// utils
import { routes } from 'utils/router'

// styles
import './UserInfo.scss'

export const UserInfo: React.FC = observer(() => {
    const [authStore] = useState(AuthStore)
    const history = useHistory()

    const { 
        firstName, 
        lastName, 
        photoUrl,
        role
    } = authStore.user

    return (
        <div 
            className='user-info' 
            onClick={() => history.push(routes.user.replace(':id', authStore.user.id))}
        >
            <div>
                <p>
                    { firstName } 
                    
                    &nbsp;

                    { lastName }
                </p>

                <Tag color={role.color}>
                    { role.name }
                </Tag>
            </div>

            <Avatar size={42} src={photoUrl} />
        </div>
    )
})