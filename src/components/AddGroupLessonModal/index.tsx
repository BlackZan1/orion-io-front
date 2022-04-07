import 
    React, 
    {
        useEffect,
        useState 
    } 
from 'react'
import { 
    Alert,
    AutoComplete, 
    Avatar, 
    Button, 
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
import { TeachersStore } from 'store/teachers'

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
        handleSubmit,
        reset,
    } = useForm()
    const [lessonsStore] = useState(LessonsStore)
    const [teachersStore] = useState(TeachersStore)
    const [groupLessonsStore] = useState(GroupLessonsStore)
    const [studyStore] = useState(StudySpaceStore)

    const [options, setOptions] = useState<any[]>([])
    const [teachers, setTeachers] = useState<any[]>([])
    const [loaded, setLoaded] = useState<boolean>(true)

    const [lessonError, setLessonError] = useState<boolean>(false)
    const [teacherError, setTeacherError] = useState<boolean>(false)
    const [lessonTimer, setLessonTimer] = useState<any>()
    const [teacherTimer, setTeacherTimer] = useState<any>()

    const [selectedLesson, setSelectedLesson] = useState<string>()
    const [selectedTeacher, setSelectedTeacher] = useState<string>()

    const onSubmitHandler = async () => {
        const dataToSent = {
            lector: selectedTeacher,
            lesson: selectedLesson
        }

        if(!selectedLesson) return setLessonError(true)
        if(!selectedTeacher) return setTeacherError(true)

        setLoaded(false)

        if(editData.id) {
            await groupLessonsStore.update(
                studyStore.activeGroup.id, 
                editData.id, 
                dataToSent
            )

            notification.success({
                message: 'Успешно отредактировано!',
                description: 'Занятие будет доступно для использования.',
                duration: 2
            })
        }
        else {
            await groupLessonsStore.create(studyStore.activeGroup.id, dataToSent)

            notification.success({
                message: 'Успешно добавлено!',
                description: 'Занятие будет доступно для использования.',
                duration: 2
            })
        }

        setLoaded(true)
        setVisible(false)
    }

    useEffect(() => {
        return () => {
            reset()
            setSelectedLesson('')
            setSelectedTeacher('')
        }
    }, [])

    const onSearchHandler = async (value: string) => {
        if(teacherTimer) clearTimeout(teacherTimer)

        setTeacherTimer(setTimeout(async () => {
            const data = await teachersStore.search(value.trim())

            setTeachers(data)
        }, 400))
    }   

    const onLessonsSearchHandler = async (value: string) => {
        if(lessonTimer) clearTimeout(lessonTimer)

        setLessonTimer(setTimeout(async () => {
            const data = await lessonsStore.searchOptional(value.trim())

            setOptions(data)
        }, 400))
    }

    const onSelectHandler = (_value: string, option: any) => {
        setSelectedLesson(option.key)
    }

    const onTeacherSelectHandler = (_value: string, option: any) => {
        setSelectedTeacher(option.key)
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
                    
                    занятие
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
                        className='uk-width-1'
                        onSelect={onSelectHandler}
                        placeholder='Введите название'
                        onSearch={onLessonsSearchHandler}
                        defaultValue={editData.lesson?.name}
                    >
                        {
                            options.map((lesson) => (
                                <AutoComplete.Option 
                                    key={lesson.id} 
                                    name={lesson.name} 
                                    value={lesson.name}
                                >
                                    <div>
                                        <Avatar 
                                            size={22} 
                                            style={{ 
                                                marginRight: 10, 
                                                backgroundColor: lesson.color 
                                            }}
                                        />

                                        <span style={{ fontSize: 14 }}>
                                            { lesson.name }
                                        </span>
                                    </div>
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
                    <p className={`${teacherError ? 'error-text' : ''}`}>
                        Выберите преподавателя

                        <span>*</span>
                    </p>

                    <AutoComplete
                        className='uk-width-1'
                        onSelect={onTeacherSelectHandler}
                        placeholder='Введите имя или фамилию'
                        onSearch={onSearchHandler}
                        defaultValue={editData.lector && `${editData.lector.firstName} ${editData.lector.lastName}`}
                    >
                        {
                            teachers.map((teacher) => (
                                <AutoComplete.Option 
                                    key={teacher['_id']} 
                                    name={teacher.fullname} 
                                    value={teacher.fullname || `${teacher.firstName} ${teacher.lastName}`}
                                >
                                    <div className='uk-flex uk-flex-middle'>
                                        <Avatar 
                                            size={22} 
                                            src={teacher.photoUrl} 
                                            style={{ marginRight: 10 }}
                                        />

                                        <span style={{ fontSize: 14 }}>
                                            { teacher.fullname || `${teacher.firstName} ${teacher.lastName}` }
                                        </span>
                                    </div>
                                </AutoComplete.Option>
                            ))
                        }
                    </AutoComplete>

                    {
                        teacherError && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message='Поле обязательно'
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
                        disabled={editData.id && (!selectedLesson && !selectedTeacher)}
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