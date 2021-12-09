import React from 'react'

// components
import { Sidebar } from 'components/Sidebar'
import { UserInfo } from 'components/UserInfo'

export const MainLayout: React.FC<any> = ({
    children,
    className,
    title,
    withoutUserInfo
}) => (
    <div className={className}>
        <Sidebar />

        <div className='main-content'>
            {
                !withoutUserInfo && (
                    <div className='main-content__header'>
                        {/* <Clock /> */}

                        <UserInfo />
                    </div>
                )
            }

            {
                title && (
                    <div className='main-content__title'>
                        <p>{ title }</p>
                    </div>
                )
            }

            <div>
                { children }
            </div>
        </div>
    </div>
)