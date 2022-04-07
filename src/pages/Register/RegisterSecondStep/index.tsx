import React, { SyntheticEvent, useEffect, useState } from 'react'
import { 
    Alert, 
    Button, 
    DatePicker, 
    Input 
} from 'antd'
import { useForm } from 'react-hook-form'
import moment, { Moment } from 'moment'

// interfaces
import { RegisterState } from 'interfaces/register'

interface RegisterSecondStepProps {
    nextStep: () => void
    prevStep: () => void
    defaultData: RegisterState
    changeData: (data: any) => void
}

export const RegisterSecondStep: React.FC<RegisterSecondStepProps> = ({
    nextStep,
    prevStep,
    defaultData,
    changeData
}) => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue
    } = useForm()
    const [birthday, setBirthday] = useState<Moment | null>()
    const [bdError, setBdError] = useState<boolean>(false)

    useEffect(() => {
        const fields = [
            'firstName',
            'lastName',
            'middleName',
            'phone',
            'birthDay'
        ]

        const data: any = { ...defaultData }

        fields.forEach((field) => {
            const currentValue = data[field]

            if(currentValue) {
                if(field === 'birthDay') {
                    setBirthday(moment(currentValue))
                }
                else {
                    setValue(
                        field, 
                        currentValue, 
                        { shouldDirty: true, shouldValidate: true }
                    )
                }
            }
        })
    }, [defaultData])

    const onSubmitHandler = (data: any) => {
        if(!birthday) {
            const input: any = document.querySelector('#birthday')

            input.focus()

            setBdError(true)

            return
        }
        
        setBdError(false)
        
        changeData({
            ...data,
            birthDay: birthday.toISOString()
        })
        nextStep()
    }

    const showError = (name: 'firstName' | 'lastName' | 'phone') => {
        switch(errors[name].type) {
            case 'minLength':
                return 'Введите больше 8 символов'
            case 'maxLength':
                return 'Введите меньше 30 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    const onChangeHandler = (ev: SyntheticEvent<HTMLInputElement>) => {
        const { name, value } = ev.currentTarget

        setValue(name, value as string)
    }

    return (
        <form
            className='uk-flex uk-flex-column uk-flex-between uk-margin-medium-top'
            style={{ minHeight: 'inherit' }}   
            onSubmit={handleSubmit(onSubmitHandler)} 
        >
            <div>
                <div className='uk-margin-small-bottom'>
                    <p className={`${errors.firstName ? 'error-text' : ''}`}>
                        Имя

                        <span className='error-text'>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите имя' 
                        className={`${errors.firstName ? 'is-error' : ''}`}
                        defaultValue={defaultData.firstName}
                        { ...register('firstName', { required: true, maxLength: 30 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.firstName && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showError('firstName')}
                            />
                        )
                    }
                </div>
                
                <div className='uk-margin-top'>
                    <p className={`${errors.lastName ? 'error-text' : ''}`}>
                        Фамилия

                        <span className='error-text'>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите фамилию' 
                        className={`${errors.lastName ? 'is-error' : ''}`}
                        defaultValue={defaultData.lastName}
                        { ...register('lastName', { required: true, maxLength: 30 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.lastName && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showError('lastName')}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p>
                        Отчество
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите отчество' 
                        defaultValue={defaultData.middleName}
                        { ...register('middleName') }
                        onChange={onChangeHandler}
                    />
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.phone ? 'error-text' : ''}`}>
                        Номер телефона

                        <span className='error-text'>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        type='tel'
                        placeholder='Введите телефон' 
                        className={`${errors.phone ? 'is-error' : ''}`}
                        defaultValue={defaultData.phone}
                        { ...register('phone', { required: true, maxLength: 30 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.phone && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showError('phone')}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top uk-margin-medium-bottom'>
                    <p className={`${bdError ? 'error-text' : ''}`}>
                        Дата рождения

                        <span className='error-text'>*</span>
                    </p>

                    <DatePicker 
                        style={{ height: 42, width: '100%' }}
                        placeholder='Выберите дату'
                        format='DD MMMM YYYY'
                        id='birthday'
                        defaultValue={
                            defaultData.birthDay ? moment(defaultData.birthDay) : undefined
                        }
                        onChange={(value) => setBirthday(value)}
                    />

                    {
                        bdError && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message='Поле обязательно'
                            />
                        )
                    }
                </div>
            </div>

            <div className='uk-flex uk-flex-between uk-margin-large-top'>
                <Button
                    htmlType='button'
                    type='ghost'
                    style={{ height: 42, width: '100%', margin: '0 10px 0 0' }}
                    onClick={prevStep}
                >
                    Назад
                </Button> 

                <Button
                    htmlType='submit'
                    type='ghost'
                    style={{ height: 42, width: '100%', margin: '0 0 0 10px' }}
                >
                    Дальше
                </Button> 
            </div>
        </form>
    )
}