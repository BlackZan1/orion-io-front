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

// utils
import { ModalProps } from 'interfaces/modal'

// components
import { BackButton } from 'components/BackButton'

// stores
import { StudySpaceStore } from 'store/studySpace'

interface AddGroupModalProps extends ModalProps {}

export const AddGroupModal: React.FC<AddGroupModalProps> = observer(({
    visible,
    setVisible
}) => {
    const [studyStore] = useState(StudySpaceStore)
    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors },
        reset
    } = useForm()
    const [loaded, setLoaded] = useState<boolean>(true)

    const onSubmitHandler = async (data: any) => {
        setLoaded(false)

        await studyStore.createGroup(data)

        notification.success({
            message: 'Успешно добавлено!',
            description: 'Новая группа будет отображаться в боковом меню.',
            duration: 2
        })

        setLoaded(true)
        setVisible(false)

        reset()
    }

    const onInputChangeHandler = (ev: SyntheticEvent<HTMLInputElement>) => {
        const { name, value } = ev.currentTarget

        setValue(name, value as string)
    }

    const showNameError = () => {
        switch(errors.name.type) {
            case 'minLength':
                return 'Введите больше 1 символа'
            case 'maxLength':
                return 'Введите меньше 50 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    const showDetailsError = () => {
        switch(errors.details.type) {
            case 'minLength':
                return 'Введите больше 1 символа'
            case 'maxLength':
                return 'Введите меньше 300 символов'
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
                    Добавить группу
                </p>

                <BackButton 
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='uk-margin-top'>
                    <p className={`${errors.name ? 'error-text' : ''}`}>
                        Название группы

                        <span>*</span>
                    </p>

                    <Input 
                        style={{ height: 42 }} 
                        placeholder='Введите название' 
                        className={`${errors.title ? 'is-error' : ''}`}
                        maxLength={30}
                        { ...register('name', { required: true, maxLength: 30 }) }
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
                        О группе

                        <span>*</span>
                    </p>

                    <Input 
                        style={{ height: 42 }} 
                        placeholder='Введите описание'
                        maxLength={300}
                        className={`${errors.details ? 'is-error' : ''}`}
                        { ...register('details', { required: true, maxLength: 150 }) }
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

                <div className='uk-margin-large-top uk-flex uk-flex-center'>
                    <Button
                        type='primary'
                        style={{ height: 42 }}
                        className='uk-width-1-2'
                        htmlType='submit'
                        loading={!loaded}
                    >
                        Создать
                    </Button>
                </div>
            </form>
        </Modal>
    )
})