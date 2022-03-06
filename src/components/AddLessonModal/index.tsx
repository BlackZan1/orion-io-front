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
    Button, 
    Input, 
    Modal, 
    notification, 
    Select,
    Tag
} from 'antd'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'

// components
import { BackButton } from 'components/BackButton'

// interfaces
import { ModalProps } from 'interfaces/modal'

// constants
import { Colors } from 'constants/colors'

// stores
import { LessonsStore } from 'store/lessons'

interface AddLessonModalProps extends ModalProps {
    editData?: any
}

export const AddLessonModal: React.FC<AddLessonModalProps> = observer(({
    visible,
    setVisible,
    editData = {}
}) => {
    const [lessonsStore] = useState(LessonsStore)
    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors },
        reset
    } = useForm()
    const [loaded, setLoaded] = useState<boolean>(true)
    const [color, setColor] = useState<string>(Colors[0].hex)

    useEffect(() => {
        if(editData.id) {
            const fields = [
                'name',
                'details'
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

            if(editData.color) setColor(editData.color)
            else setColor(Colors[0].hex)
        }

        return () => reset()
    }, [editData])

    const onSubmitHandler = async (data: any) => {
        const dataToSent = {
            ...data,
            color
        }

        setLoaded(false)

        if(editData.id) {
            await lessonsStore.update(editData.id, dataToSent)

            notification.success({
                message: 'Успешно обновлено!',
                description: 'Дисциплина будет доступна для использования.',
                duration: 2
            })
        }
        else {
            await lessonsStore.create(dataToSent)

            notification.success({
                message: 'Успешно добавлено!',
                description: 'Дисциплина будет доступна для использования.',
                duration: 2
            })
        }
        
        setLoaded(true)
        setVisible(false)
    }

    const onInputChangeHandler = (ev: SyntheticEvent<any>) => {
        const { name, value } = ev.currentTarget

        setValue(name, value as string)
    }

    const showNameError = () => {
        switch(errors.name.type) {
            case 'maxLength':
                return 'Введите меньше 150 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    const showDetailsError = () => {
        switch(errors.details.type) {
            case 'maxLength':
                return 'Введите меньше 150 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    const onColorChangeHandler = (value: string) => setColor(value)

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
                    
                    дисциплину
                </p>

                <BackButton
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='uk-margin-top'>
                    <p className={`${errors.name ? 'error-text' : ''}`}>
                        Название дисциплины

                        <span>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите название' 
                        defaultValue={editData.name}
                        className={`${errors.name ? 'is-error' : ''}`}
                        maxLength={30}
                        { ...register('name', { required: true, maxLength: 150 }) }
                        onChange={onInputChangeHandler}
                    />

                    {
                        errors.name && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showNameError()}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.details ? 'error-text' : ''}`}>
                        Описание дисциплины
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите описание' 
                        defaultValue={editData.details}
                        className={`${errors.details ? 'is-error' : ''}`}
                        { ...register('details', { required: false, maxLength: 150 }) }
                        onChange={onInputChangeHandler}
                    />

                    {
                        errors.details && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showDetailsError()}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p>Цвет отображения</p>

                    <Select
                        className='uk-width-1'
                        value={color}
                        onChange={onColorChangeHandler}
                    >
                        {
                            Colors.map((colorItem, index) => (
                                <Select.Option key={index} value={colorItem.hex}>
                                    <Tag color={colorItem.hex} style={{ minWidth: 125 }}>
                                        { colorItem.name }
                                    </Tag>
                                </Select.Option>
                            ))
                        }
                    </Select>
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