import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { observer } from 'mobx-react'

// components
import { Sidebar } from 'components/Sidebar'
import { UserInfo } from 'components/UserInfo'
import { PreloaderPage } from 'pages/PrealoderPage'

// stores
import { AuthStore } from 'store/auth'

// hooks
import { useLocaleStorage } from 'hooks/localStorage.hook'

// utils
import { routes } from 'utils/router'

export const MainLayout: React.FC<any> = observer(({
    children,
    className,
    title,
    withoutUserInfo
}) => {
    const { value: tokenValue } = useLocaleStorage('orion_t')
    const [authStore] = useState(AuthStore)

    if(authStore.auth === null && !!tokenValue) return <PreloaderPage />
    if(authStore.auth === false) return <Redirect to={routes.auth.signin} />

    return (
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
})