import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router'

// components
import { PreloaderPage } from 'pages/PrealoderPage'

// stores
import { AuthStore } from 'store/auth'
import { StudySpaceStore } from 'store/studySpace'

// hooks
import { useLocaleStorage } from 'hooks/localStorage.hook'

// utils
import { routes } from 'utils/router'

// assets
import { ReactComponent as LogoSVG } from 'assets/logo.svg'

// styles
import './AuthLayout.scss'

export const AuthLayout: React.FC<any> = observer(({
    children
}) => {
    const { value: tokenValue } = useLocaleStorage('orion_t')
    const [authStore] = useState(AuthStore)
    const [studyStore] = useState(StudySpaceStore)

    const { groups } = studyStore.data

    if(authStore.auth === null && !!tokenValue) return <PreloaderPage />
    if(authStore.auth) {
        const hasGroups = groups.length > 0

        return <Redirect to={hasGroups ? routes.main.replace(':groupId', groups[0].id) : routes.user} />
    }

    return (
        <div className='auth-layout'>
            <div className='auth-layout__logo uk-animation-stroke'>
                <LogoSVG />
            </div>

            <div className='auth-layout__content uk-margin-medium-bottom'>
                { children }
            </div>
        </div>
    )
})