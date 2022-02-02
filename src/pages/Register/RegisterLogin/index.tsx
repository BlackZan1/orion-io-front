import React, { useState } from 'react'
import { Button, Input, Tag } from 'antd'
import { observer } from 'mobx-react'
import { useForm } from 'react-hook-form'

// components
import { BackButton } from 'components/BackButton'

// services
import { AuthStore } from 'store/auth'

// utils
import { LoginData } from 'interfaces/auth'
import { RegisterModeType } from '..'

interface RegisterLoginProps {
    setMode: (mode: RegisterModeType) => void
}

export const RegisterLogin: React.FC<RegisterLoginProps> = observer(({
    setMode
}) => {
    const [authState] = useState(AuthStore)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitHandler = (data: LoginData) => {
        console.log(data)

        authState.login(data)
    }

    return (
        <>
            <div style={{ width: '100%', minHeight: 'inherit' }}>
                <BackButton onClick={() => setMode('intro')} />

                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className='uk-flex uk-flex-column uk-flex-between'
                    style={{ minHeight: 'inherit' }}    
                >
                    <div className='uk-margin-medium-top'>
                        <div className='uk-margin-small-bottom'>
                            <p>
                                Email
                            </p>

                            <Input
                                { ...register('email', { required: true }) }
                                style={{ height: 42 }} 
                                type='email'
                                placeholder='Введите email' 
                            />
                        </div>
                        
                        <div className='uk-margin-top'>
                            <p>
                                Пароль
                            </p>

                            <Input.Password
                                { ...register('password', { required: true, maxLength: 32, minLength: 8 }) }
                                style={{ height: 42 }} 
                                placeholder='Введите пароль' 
                            />

                            { 
                                authState.errors.login && (
                                    <Tag 
                                        className='uk-margin-top uk-width-1' 
                                        color='error'
                                        style={{ fontSize: 16, padding: 7 }}
                                    >
                                        Неправильный email или пароль
                                    </Tag>
                                )  
                            }
                        </div>
                    </div>

                    <Button
                        htmlType='submit'
                        type='ghost' 
                        style={{ height: 42 }}
                        loading={!authState.loaded}
                    >
                        Войти
                    </Button> 
                </form>
            </div>
        </>
    )
})