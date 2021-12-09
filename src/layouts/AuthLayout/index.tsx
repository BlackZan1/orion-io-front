import React from 'react'

// assets
import { ReactComponent as LogoSVG } from 'assets/logo.svg'

// styles
import './AuthLayout.scss'

export const AuthLayout: React.FC<any> = ({
    children
}) => {
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
}