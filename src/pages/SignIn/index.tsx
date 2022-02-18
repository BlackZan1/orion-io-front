import React, { useState } from 'react'

// components
import { SignInLogin } from './SignInLogin'
import { SignInIntro } from './RegisterIntro'

// styles
import './SignIn.scss'

export type SignInModeType = 'intro' | 'login'

export const SignInContainer: React.FC = () => {
    const [mode, setMode] = useState<SignInModeType>('intro')

    const showContent = () => {
        switch(mode) {
            case 'intro':
                return <SignInIntro setMode={setMode} />
            case 'login':
                return <SignInLogin setMode={setMode} />
            default:
                return null
        }
    }

    return (
        <div className='register-block'>
            { showContent() }
        </div>
    )
}