import React, { useState } from 'react'

// components
import { RegisterLogin } from './RegisterLogin'
import { RegisterIntro } from './RegisterIntro'

// styles
import './Register.scss'

export type RegisterModeType = 'intro' | 'login'

export const RegisterContainer: React.FC = () => {
    const [mode, setMode] = useState<RegisterModeType>('intro')

    const showContent = () => {
        switch(mode) {
            case 'intro':
                return <RegisterIntro setMode={setMode} />
            case 'login':
                return <RegisterLogin setMode={setMode} />
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