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
    notification
} from 'antd'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'

// components
import { BackButton } from 'components/BackButton'

// stores
import { LessonsStore } from 'store/lessons'
import { GroupLessonsStore } from 'store/groupLessons'
import { StudySpaceStore } from 'store/studySpace'

// interfaces
import { ModalProps } from 'interfaces/modal'

interface AddGroupLessonModalProps extends ModalProps {
    editData?: any
}

export const AddGroupLessonModal: React.FC<AddGroupLessonModalProps> = observer(({
    visible,
    setVisible,
    editData = {}
}) => {
    const { 
        register, 
        handleSubmit, 
        setValue,
        formState: { errors },
        reset,
        watch
    } = useForm()
    const [lessonsStore] = useState(LessonsStore)
    const [groupLessonsStore] = useState(GroupLessonsStore)
    const [studyStore] = useState(StudySpaceStore)

    const [options, setOptions] = useState<any[]>([])
    const [loaded, setLoaded] = useState<boolean>(true)
    const [lessonError, setLessonError] = useState<boolean>(false)
    const [selectedLesson, setSelectedLesson] = useState<string>()

    const onSubmitHandler = async (data: any) => {
        const dataToSent = {
            ...data,
            lesson: selectedLesson
        }

        if(!selectedLesson) return setLessonError(true)

        setLoaded(false)

        await groupLessonsStore.create(studyStore.activeGroup.id, dataToSent)

        notification.success({
            message: 'Успешно добавлено!',
            description: 'Занятие будет доступно для использования.',
            duration: 2
        })

        setLoaded(true)
        setVisible(false)
    }

    const onInputChangeHandler = (ev: SyntheticEvent<any>) => {
        const { name, value } = ev.currentTarget

        setValue(name, value as string)
    }

    const onSelectHandler = (id: string) => setSelectedLesson(id)

    useEffect(() => {
        setOptions(
            lessonsStore.data.map((i) => ({ 
                value: i.name,
                ...i,
                label: (
                    <div
                        className='uk-flex uk-flex-middle'
                    >
                        <div 
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 7,
                                backgroundColor: i.color
                            }}
                            className='uk-margin-right'
                        />

                        { i.name }
                    </div>
                ) 
            }))
        )
    }, [lessonsStore.data])

    const showLectorError = () => {
        switch(errors.lector.type) {
            case 'maxLength':
                return 'Введите меньше 150 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
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
                    Добавить занятие
                </p>

                <BackButton
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='uk-margin-top'>
                    <p className={`${lessonError ? 'error-text' : ''}`}>
                        Выберите дисциплину

                        <span>*</span>
                    </p>

                    <AutoComplete 
                        defaultValue={lessonsStore.data.find((i) => i.id === selectedLesson)?.name}
                        className='uk-width-1'
                        options={options}
                        onSelect={onSelectHandler}
                        placeholder='Введите название'
                        filterOption={(inputValue, option) => {
                            if(option) {
                                const nameExist = option!
                                    .name
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1

                                if(nameExist) {
                                    setSelectedLesson(option.id)

                                    return true
                                }

                                return false
                            }

                            return false
                        }}
                    />

                    {
                        lessonError && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={'Поле обязательно'}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.lector ? 'error-text' : ''}`}>
                        Введите ФИО лектора

                        <span>*</span>
                    </p>

                    <Input 
                        style={{ height: 42 }}
                        placeholder='Введите ФИО' 
                        defaultValue={editData.lector}
                        className={`${errors.lector ? 'is-error' : ''}`}
                        { ...register('lector', { required: true, maxLength: 150 }) }
                        onChange={onInputChangeHandler}
                    />

                    {
                        errors.lector && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showLectorError()}
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