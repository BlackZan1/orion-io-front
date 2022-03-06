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
    notification 
} from 'antd'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'

// components
import { BackButton } from 'components/BackButton'

// interfaces
import { ModalProps } from 'interfaces/modal'

// stores
import { AuditoriesStore } from 'store/auditories'

interface AddAuditoryModalProps extends ModalProps {
    editData?: any
}

export const AddAuditoryModal: React.FC<AddAuditoryModalProps> = observer(({
    visible,
    setVisible,
    editData = {}
}) => {
    const [auditoriesStore] = useState(AuditoriesStore)
    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors },
        reset
    } = useForm()
    const [loaded, setLoaded] = useState<boolean>(true)

    useEffect(() => {
        if(editData.id) {
            const fields = [
                'name',
                'building'
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
        }

        return () => reset()
    }, [editData])

    const onSubmitHandler = async (data: any) => {
        setLoaded(false)

        if(editData.id) {
            await auditoriesStore.update(editData.id, data)    

            notification.success({
                message: 'Успешно обновлено!',
                description: 'Аудитория будет доступна для использования.',
                duration: 2
            })
        }
        else {
            await auditoriesStore.create(data)

            notification.success({
                message: 'Успешно добавлено!',
                description: 'Аудитория будет доступна для использования.',
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

    const showBuildingError = () => {
        switch(errors.building.type) {
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
                    {
                        !editData.id ? (
                            'Добавить '
                        )
                        : (
                            'Изменить '
                        )
                    } 
                    
                    аудиторию
                </p>

                <BackButton
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='uk-margin-top'>
                    <p className={`${errors.name ? 'error-text' : ''}`}>
                        Наименование аудитории

                        <span>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите наименование' 
                        defaultValue={editData.name}
                        className={`${errors.name ? 'is-error' : ''}`}
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
                    <p className={`${errors.building ? 'error-text' : ''}`}>
                        Наименование здания
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите здание' 
                        defaultValue={editData.building}
                        className={`${errors.building ? 'is-error' : ''}`}
                        { ...register('building', { required: false, maxLength: 150 }) }
                        onChange={onInputChangeHandler}
                    />

                    {
                        errors.building && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showBuildingError()}
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