import React, { SyntheticEvent, useEffect, useState } from 'react'
import { 
    Button,
    Input, 
    Modal, 
    notification, 
    Select, 
    Tag, 
    TimePicker 
} from 'antd'
import { AiOutlineSwap } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import moment, { Moment } from 'moment'
import { observer } from 'mobx-react'

// utils
import { ModalProps } from 'interfaces/modal'
import { CreateEventData } from 'interfaces/schedule'
import { Days } from 'constants/days'

// components
import { BackButton } from 'components/BackButton'
import { Colors } from 'constants/colors'

// stores
import { ScheduleStore } from 'store/schedule'

interface AddEventModalProps extends ModalProps {
    editData?: any
}

export const AddEventModal: React.FC<AddEventModalProps> = observer(({
    visible,
    setVisible,
    editData = {}
}) => {
    const [scheduleStore] = useState(ScheduleStore)
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch 
    } = useForm()
    const [day, setDay] = useState<number>(moment().isoWeekday())
    const [color, setColor] = useState<string>(Colors[0])
    const [dates, setDates] = useState<any>({
        from: null,
        to: null
    })
    const [loaded, setLoaded] = useState<boolean>(true)

    const onSubmitHandler = async (data: any) => {
        setLoaded(false)

        const dataToSent: CreateEventData = {
            ...data,
            day,
            color
        }

        const inputFrom: any = document.querySelector('#time-from')
        const inputTo: any = document.querySelector('#time-to')

        if(!dates.from) return inputFrom.focus()
        
        dataToSent.startDate = dates.from.toISOString()

        if(!dates.to) return inputTo.focus()

        dataToSent.endDate = dates.to.toISOString()

        if(editData.id) {
            await scheduleStore.updateEvent(
                editData.id,
                dataToSent
            )

            notification.success({
                message: 'Успешно отредактировано!',
                description: 'Событие будет отображено в разделе расписание.',
                duration: 2
            })
        }
        else {
            await scheduleStore.createEvent(
                dataToSent, 
                () => {
                    notification.success({
                        message: 'Успешно добавлено!',
                        description: 'Новое событие будет отображено в разделе расписание.',
                        duration: 2
                    })
                }
            )
        }

        setLoaded(true)
        setVisible(false)
    }

    useEffect(() => {
        if(editData.id) {
            const fields = [
                'title',
                'description'
            ]
    
            fields.forEach((field) => {
                setValue(
                    field,
                    editData[field], 
                    {
                        shouldValidate: true,
                        shouldDirty: true
                    }
                )
            })
    
            if(editData.day) setDay(editData.day)
            else setDay(moment().isoWeekday())
    
            if(editData.color) setColor(editData.color)
            else setColor(Colors[0])
    
            setDates({
                from: editData.startDate ? moment(editData.startDate) : null,
                to: editData.endDate ? moment(editData.endDate) : null
            })
        }
    }, [editData])

    const onDayChangeHandler = (value: number) => setDay(value)
    const onColorChangeHandler = (value: string) => setColor(value)

    const onTimeChangeHandler = (name: string, value: Moment | null) => {
        setDates((prev: any) => ({
            ...prev,
            [name]: value || null
        }))
    }

    const onInputChangeHandler = (ev: SyntheticEvent<any>) => {
        const { name, value } = ev.currentTarget

        setValue(name, value as string)
    }
    
    return (
        <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            closeIcon={<div />}
            footer={null}
            destroyOnClose
        >
            <div className='uk-flex uk-flex-right'>
                <BackButton 
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='uk-margin-top'>
                    <p>Название</p>

                    <Input 
                        style={{ height: 42 }} 
                        placeholder='Введите название' 
                        defaultValue={editData.title}
                        maxLength={30}
                        { ...register('title', { required: true, minLength: 1, maxLength: 30 }) }
                        onChange={onInputChangeHandler}
                    />
                </div>

                <div className='uk-margin-top'>
                    <p>Описание</p>

                    <Input 
                        style={{ height: 42 }} 
                        placeholder='Введите описание'
                        defaultValue={editData.description}
                        maxLength={150}
                        { ...register('description', { required: true, minLength: 1, maxLength: 150 }) }
                        onChange={onInputChangeHandler} 
                    />
                </div>

                <div className='uk-margin-top uk-flex uk-flex-between'>
                    <div className='uk-width-1'>
                        <p>День недели</p>

                        <Select
                            aria-required
                            className='uk-width-1'
                            value={day}
                            onChange={onDayChangeHandler}
                        >
                            {
                                Days.map((dayItem, index) => (
                                    <Select.Option key={index} value={dayItem.id}>
                                        { dayItem.name }
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </div>

                    <div className='uk-width-1-2 uk-margin-left'>
                        <p>Цвет</p>

                        <Select
                            className='uk-width-1'
                            value={color}
                            onChange={onColorChangeHandler}
                        >
                            {
                                Colors.map((colorItem, index) => (
                                    <Select.Option key={index} value={colorItem}>
                                        <Tag color={colorItem} className='uk-width-1'>
                                            { colorItem }
                                        </Tag>
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                </div>

                <div className='uk-margin-top uk-margin-large-bottom'>
                    <div className='uk-flex uk-flex-between'>
                        <p style={{ width: '40%' }}>От</p>

                        <p style={{ width: '40%' }}>До</p>
                    </div>

                    <div className='uk-flex uk-flex-between'>
                        <TimePicker 
                            style={{ height: 42, width: '40%' }} 
                            onChange={(value) => onTimeChangeHandler('from', value)}
                            id='time-from'
                            value={dates.from}
                        />

                        <AiOutlineSwap size={22} />
                        
                        <TimePicker 
                            style={{ height: 42, width: '40%' }} 
                            onChange={(value) => onTimeChangeHandler('to', value)}
                            id='time-to'
                            value={dates.to}
                        />
                    </div>
                </div>

                <div className='uk-margin-large-top uk-flex uk-flex-center'>
                    <Button
                        type='primary'
                        style={{ height: 42 }}
                        className='uk-width-1-2'
                        htmlType='submit'
                        loading={!loaded}
                    >
                        {
                            editData.id ? (
                                'Редактировать'
                            )
                            : (
                                'Создать'
                            )
                        }
                    </Button>
                </div>
            </form>
        </Modal>
    )
})