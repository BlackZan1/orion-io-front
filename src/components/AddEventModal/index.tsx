import 
    React, 
    { 
        SyntheticEvent, 
        useEffect, 
        useState 
    } 
from 'react'
import { 
    Alert,
    AutoComplete,
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

// stores
import { ScheduleStore } from 'store/schedule'
import { GroupLessonsStore } from 'store/groupLessons'
import { StudySpaceStore } from 'store/studySpace'

interface AddEventModalProps extends ModalProps {
    editData?: any
}

export const AddEventModal: React.FC<AddEventModalProps> = observer(({
    visible,
    setVisible,
    editData = {}
}) => {
    const [scheduleStore] = useState(ScheduleStore)
    const [groupLessonsStore] = useState(GroupLessonsStore)
    const [studyStore] = useState(StudySpaceStore)

    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors },
        reset
    } = useForm()
    const [day, setDay] = useState<number>(moment().isoWeekday())
    const [dates, setDates] = useState<any>({
        from: null,
        to: null
    })
    const [options, setOptions] = useState<any[]>([])
    const [selectedLesson, setSelectedLesson] = useState<string>()
    const [loaded, setLoaded] = useState<boolean>(true)
    const [timeError, setTimeError] = useState<null | string>()
    const [lessonError, setLessonError] = useState<boolean>(false)

    const onSubmitHandler = async (data: any) => {
        const dataToSent: CreateEventData = {
            ...data,
            lesson: selectedLesson,
            day
        }

        const inputFrom: any = document.querySelector('#time-from')
        const inputTo: any = document.querySelector('#time-to')

        if(!selectedLesson) return setLessonError(true)
        
        if(!dates.from) {
            setTimeError('Поля обязательны')

            return inputFrom.focus()
        }
        
        if(!dates.to) {
            setTimeError('Поля обязательны')

            return inputTo.focus()
        }

        if(+dates.from.format('HHmm') > +dates.to.format('HHmm')) {
            setTimeError('Поле От должно быть меньше До')

            return
        }

        setLessonError(false)
        setLoaded(false)

        dataToSent.startDate = dates.from.toISOString()
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
            const fields = ['description']
    
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

            if(editData.lesson) setSelectedLesson(editData.lesson.id)
    
            if(editData.day) setDay(editData.day)
            else setDay(moment().isoWeekday())
    
            setDates({
                from: editData.startDate ? moment(editData.startDate) : null,
                to: editData.endDate ? moment(editData.endDate) : null
            })
        }

        return () => {
            reset()
        }
    }, [editData])

    const onDayChangeHandler = (value: number) => setDay(value)

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

    const showDescError = () => {
        switch(errors.description.type) {
            case 'minLength':
                return 'Введите больше 1 символа'
            case 'maxLength':
                return 'Введите меньше 150 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    const onLessonsSearchHandler = async (value: string) => {
        const data = await groupLessonsStore.search(studyStore.activeGroup.id, value.trim())

        setOptions(data)
    }

    const onSelectHandler = (_value: string, option: any) => {
        setSelectedLesson(option.key)
    }
    
    return (
        <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            closeIcon={<div />}
            footer={null}
            destroyOnClose
        >
            <div className='uk-flex uk-flex-between'>
                <p style={{ fontWeight: 'bold' }}>
                    {
                        !editData.id ? (
                            'Добавить '
                        )
                        : (
                            'Изменить '
                        )
                    } 
                    
                    событие
                </p>

                <BackButton 
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='uk-margin-top'>
                    <p className={`${lessonError ? 'error-text' : ''}`}>
                        Выберите занятие

                        <span>*</span>
                    </p>

                    <AutoComplete 
                        className='uk-width-1'
                        onSelect={onSelectHandler}
                        placeholder='Введите название'
                        onSearch={onLessonsSearchHandler}
                    >
                        {
                            options.map((lesson) => (
                                <AutoComplete.Option 
                                    key={lesson.id} 
                                    name={lesson.name} 
                                    value={lesson.name}
                                >
                                    { `${lesson.name} | ${lesson.lector.lastName} ${lesson.lector.firstName}` }
                                </AutoComplete.Option>
                            ))
                        }
                    </AutoComplete>

                    {
                        lessonError && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message='Поле обязательно'
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.description ? 'error-text' : ''}`}>
                        Описание события 

                        <span>*</span>
                    </p>

                    <Input 
                        style={{ height: 42 }} 
                        placeholder='Введите описание'
                        defaultValue={editData.description}
                        maxLength={150}
                        className={`${errors.description ? 'is-error' : ''}`}
                        { ...register('description', { required: true, maxLength: 150 }) }
                        onChange={onInputChangeHandler} 
                    />

                    {
                        errors.description && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showDescError()}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top uk-width-1'>
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

                <div className='uk-margin-top uk-margin-large-bottom'>
                    <div className={`uk-flex uk-flex-between ${!!timeError ? 'error-text' : ''}`}>
                        <p style={{ width: '40%' }}>
                            От

                            <span>*</span>
                        </p>

                        <p style={{ width: '40%' }}>
                            До

                            <span>*</span>
                        </p>
                    </div>

                    <div className='uk-flex uk-flex-between'>
                        <TimePicker 
                            style={{ height: 42, width: '40%' }} 
                            id='time-from'
                            value={dates.from}
                            showSecond={false}
                            showNow={false}
                            className={`${!!timeError ? 'is-error' : ''}`}
                            onSelect={(value) => onTimeChangeHandler('from', value)}
                            format='HH:mm'
                            disabledHours={() => (
                                [0, 1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23]
                            )}
                        />

                        <AiOutlineSwap size={22} />
                        
                        <TimePicker 
                            style={{ height: 42, width: '40%' }} 
                            id='time-to'
                            value={dates.to}
                            showSecond={false}
                            showNow={false}
                            className={`${!!timeError ? 'is-error' : ''}`}
                            onSelect={(value) => onTimeChangeHandler('to', value)}
                            format='HH:mm'
                            disabledHours={() => (
                                [0, 1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23]
                            )}
                        />
                    </div>

                    {
                        !!timeError && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={timeError}
                            />
                        )
                    }
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