import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { useHistory } from 'react-router'

// utils
import { routes } from 'utils/router'

// styles
import './Register.scss'

type RegisterModeType = 'intro' | 'group' | 'login'

export const RegisterContainer: React.FC = () => {
    const [mode, setMode] = useState<RegisterModeType>('intro')
    const history = useHistory()

    const showContent = () => {
        switch(mode) {
            case 'intro':
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

                                необходимо найти нужную 
                                Вам группу (учебное окружение) и после войти в 
                                свой аккаунт
                            </p>

                            <p>
                                Либо создайте группу (учебное окружение) 
                                для последующего использования системой
                            </p>
                        </div>
                        
                        <div style={{ display: '-webkit-flex', flexDirection: 'column', width: '100%' }}>
                            <Button 
                                type='primary' 
                                style={{ height: 42, marginBottom: 20 }}
                                onClick={() => setMode('group')}
                            >
                                Войти в группу
                            </Button>

                            <Button type='ghost' style={{ height: 42 }}>
                                Создать группу
                            </Button>
                        </div>
                    </>
                )
            case 'group': // Убрать!
                return (
                    <>
                        <div style={{ width: '100%' }}>
                            <p>
                                Название группы
                            </p>

                            <Input style={{ height: 42 }} placeholder='Введите название' />
                        </div>
                        
                        <div style={{ display: '-webkit-flex', flexDirection: 'column', width: '100%' }}>
                            <Button 
                                type='ghost' 
                                style={{ height: 42 }}
                                onClick={() => setMode('login')}
                            >
                                Продолжить
                            </Button> 
                        </div>
                    </>
                )
            case 'login':
                return (
                    <>
                        <div style={{ width: '100%' }}>
                            <div style={{ marginBottom: 15 }}>
                                <p>
                                    Email
                                </p>

                                <Input style={{ height: 42 }} placeholder='Введите email' />
                            </div>
                            
                            <div>
                                <p>
                                    Пароль
                                </p>

                                <Input style={{ height: 42 }} type='password' placeholder='Введите пароль' />
                            </div>
                        </div>
                        
                        <div style={{ display: '-webkit-flex', flexDirection: 'column', width: '100%' }}>
                            <Button 
                                type='ghost' 
                                style={{ height: 42 }}
                                onClick={() => history.push(routes.main)}
                            >
                                Войти
                            </Button> 
                        </div>
                    </>
                )
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