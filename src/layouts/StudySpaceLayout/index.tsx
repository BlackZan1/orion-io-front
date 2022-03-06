import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { observer } from 'mobx-react'

// components
import { Sidebar } from 'components/Sidebar'
import { UserInfo } from 'components/UserInfo'
import { PreloaderPage } from 'pages/PrealoderPage'

// stores
import { AuthStore } from 'store/auth'
import { StudySpaceStore } from 'store/studySpace'

// hooks
import { useLocaleStorage } from 'hooks/localStorage.hook'

// utils
import { routes } from 'utils/router'

export const StudySpaceLayout: React.FC<any> = observer(({
    children,
    className,
    title,
    isStudySpaceName
}) => {
    const { value: tokenValue } = useLocaleStorage('orion_t')
    const [authStore] = useState(AuthStore)
    const [studyStore] = useState(StudySpaceStore)

    if(authStore.auth === null) {
        if(!!tokenValue) return <PreloaderPage />

        return <Redirect to={routes.auth.signin} />
    }
    if(authStore.auth === false) return <Redirect to={routes.auth.signin} />

    return (
        <div className={className}>
            <Sidebar />

            <div className='main-content'>
                <div className='main-content__header'>
                    <UserInfo />
                </div>

                {
                    title && (
                        <div className='main-content__title'>
                            <p>
                                { title }
                            </p>
                        </div>
                    )
                }

                {
                    isStudySpaceName && (
                        <div className='main-content__title'>
                            <p>
                                { studyStore.data.name }
                            </p>
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