import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
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
import { StudySpaceStore } from 'store/studySpace'
import { GroupData } from 'interfaces/studySpace'

export const MainLayout: React.FC<any> = observer(({
    children,
    className,
    title,
    withoutUserInfo
}) => {
    const { groupId } = useParams<any>()
    const { value: tokenValue } = useLocaleStorage('orion_t')
    const [authStore] = useState(AuthStore)
    const [studyStore] = useState(StudySpaceStore)

    if(authStore.auth === null && !!tokenValue) return <PreloaderPage />
    if(authStore.auth === false) return <Redirect to={routes.auth.signin} />

    const currentGroup = studyStore.data.groups.find((i) => i.id === groupId)

    if(!currentGroup) {
        return (
            <div className={className}>
                <Sidebar />

                <div className='main-content'>
                    <h1>Нет доступа к данной группе либо ее не существует</h1>
                </div>
            </div>
        )
    }
    
    if(studyStore.activeGroup.id !== currentGroup.id) {
        studyStore.setActiveGroup(currentGroup)
    }

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