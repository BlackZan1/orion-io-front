import React from 'react'
import { Button } from 'antd'

// utils
import { SignInModeType } from '..'

interface SignInIntroProps {
    setMode: (mode: SignInModeType) => void
}

export const SignInIntro: React.FC<SignInIntroProps> = ({
    setMode
}) => {
    return (
        <>
            <div>
                <h2 style={{ marginBottom: 10 }}>
                    Добро пожаловать! 
                </h2>

                <p>
                    Для использования учебной системой 

                    {' '}

                    <span>
                        OrionIO 
                    </span>

                    {', '}

                    необходимо войти в свой аккаунт
                </p>

                <p>
                    Либо создайте аккаунт и учебное окружение
                    для последующего использования системой
                </p>
            </div>
            
            <div style={{ display: '-webkit-flex', flexDirection: 'column', width: '100%' }}>
                <Button 
                    type='primary' 
                    style={{ height: 42, marginBottom: 20 }}
                    onClick={() => setMode('login')}
                >
                    Войти
                </Button>

                <Button type='ghost' style={{ height: 42 }}>
                    Создать учебное окружение
                </Button>
            </div>
        </>
    )
}