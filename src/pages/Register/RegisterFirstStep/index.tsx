import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Alert, Button, Input } from 'antd'
import { useForm } from 'react-hook-form'

// interfaces
import { RegisterState } from 'interfaces/register'

interface RegisterFirstStepProps {
    nextStep: () => void
    changeData: (data: any) => void
    defaultData: RegisterState
    checkEmail: (email: string) => Promise<any>
}

export const RegisterFirstStep: React.FC<RegisterFirstStepProps> = ({
    nextStep,
    changeData,
    defaultData,
    checkEmail
}) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue
    } = useForm()
    const [notMatch, setNotMatch] = useState<boolean>(false)
    const [exist, setExist] = useState<boolean>(false)

    useEffect(() => {
        if(defaultData.email) {
            setValue('email', defaultData.email, { shouldDirty: true, shouldValidate: true })
        }

        if(defaultData.password) {
            setValue('password', defaultData.password, { shouldDirty: true, shouldValidate: true })
            setValue('repeatPassword', defaultData.password, { shouldDirty: true, shouldValidate: true })
        }
    }, [defaultData])

    const onSubmitHandler = async (data: any) => {
        if(data.password !== data.repeatPassword) {
            setNotMatch(true)

            return
        }

        delete data['repeatPassword']

        const isOK = await checkEmail(data.email)

        if(!isOK) {
            setExist(true)

            return
        }

        changeData(data)
        nextStep()
    }

    const onChangeHandler = (ev: SyntheticEvent<HTMLInputElement>) => {
        const { name, value } = ev.currentTarget

        setValue(name, value as string)
    }

    const showError = (name: 'password' | 'repeatPassword' | 'email') => {
        switch(errors[name].type) {
            case 'minLength':
                return 'Введите больше 8 символов'
            case 'maxLength':
                return 'Введите меньше 32 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    return (
        <form
            className='uk-flex uk-flex-column uk-flex-between uk-margin-medium-top'
            style={{ minHeight: 'inherit' }}   
            onSubmit={handleSubmit(onSubmitHandler)} 
        >
            <div>
                <div className='uk-margin-small-bottom'>
                    <p className={`${(errors.email || exist) ? 'error-text' : ''}`}>
                        Email
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        type='email'
                        placeholder='Введите email' 
                        defaultValue={defaultData.email}
                        className={`${(errors.email || exist) ? 'is-error' : ''}`}
                        { ...register('email', { required: true }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.email ? (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showError('email')}
                            />
                        )
                        : (
                            exist && (
                                <Alert
                                    className='uk-margin-small-top'
                                    showIcon
                                    type='error'
                                    message='Email уже зарегистрирован'
                                />
                            )
                        )
                    }
                </div>
                
                <div className='uk-margin-top'>
                    <p className={`${errors.password ? 'error-text' : ''}`}>
                        Пароль
                    </p>

                    <Input.Password
                        style={{ height: 42 }} 
                        placeholder='Введите пароль'
                        defaultValue={defaultData.password}
                        className={`${errors.password ? 'is-error' : ''}`}
                        { ...register('password', { required: true, minLength: 8, maxLength: 32 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.password && (
                            <Alert 
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showError('password')}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.repeatPassword ? 'error-text' : ''}`}>
                        Повторите пароль
                    </p>

                    <Input.Password
                        style={{ height: 42 }} 
                        placeholder='Введите пароль еще' 
                        defaultValue={defaultData.password}
                        className={`${(notMatch || errors.repeatPassword) ? 'is-error' : ''}`}
                        { ...register('repeatPassword', { required: true, minLength: 8, maxLength: 32 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        notMatch ? (
                            <Alert 
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message='Пароли не совпадают'
                            />
                        )
                        : (
                            errors.repeatPassword && (
                                <Alert 
                                    className='uk-margin-small-top'
                                    showIcon
                                    type='error'
                                    message={showError('repeatPassword')}
                                />
                            )
                        )
                    }
                </div>
            </div>

            <Button
                htmlType='submit'
                type='ghost' 
                style={{ height: 42 }}
                className='uk-margin-large-top'
            >
                Дальше
            </Button> 
        </form>
    )
}