import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router'

// components
import { PreloaderPage } from 'pages/PrealoderPage'

// stores
import { AuthStore } from 'store/auth'

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
    
    if(authStore.auth === null && !!tokenValue) return <PreloaderPage />
    if(authStore.auth) return <Redirect to={routes.main} />

    return (
        <div className='auth-layout'>
            <div className='auth-layout__logo'>
                <LogoSVG />
            </div>

            <div className='auth-layout__content'>
                { children }
            </div>
        </div>
    )
})