import 
    React, 
    {
        useState 
    } 
from 'react'
import { 
    Alert,
    AutoComplete, 
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
        register, 
        handleSubmit, 
        setValue,
        formState: { errors },
        reset,
        watch
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

        await groupLessonsStore.create(studyStore.activeGroup.id, dataToSent)

        notification.success({
            message: 'Успешно добавлено!',
            description: 'Занятие будет доступно для использования.',
            duration: 2
        })

        setLoaded(true)
        setVisible(false)
    }

    const onSearchHandler = async (value: string) => {
        const data = await teachersStore.search(value.trim())

        setTeachers(data)
    }   

    const onLessonsSearchHandler = async (value: string) => {
        const data = await lessonsStore.searchOptional(value.trim())

        setOptions(data)
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
                                    { lesson.name }
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
                    >
                        {
                            teachers.map((teacher) => (
                                <AutoComplete.Option 
                                    key={teacher['_id']} 
                                    name={teacher.fullname} 
                                    value={teacher.fullname || `${teacher.firstName} ${teacher.lastName}`}
                                >
                                    { teacher.fullname || `${teacher.firstName} ${teacher.lastName}` }
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