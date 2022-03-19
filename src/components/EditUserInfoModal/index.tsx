import React, { SyntheticEvent, useState } from 'react'
import { useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { 
    Alert, 
    Button, 
    Input, 
    Modal 
} from 'antd'
import { AiOutlineFileImage } from 'react-icons/ai'
import { observer } from 'mobx-react'

// stores
import { UserStore } from 'store/user'
import { StudySpaceStore } from 'store/studySpace'

// interfaces
import { ModalProps } from 'interfaces/modal'

// helpers
import { withoutFailObjectData } from 'utils/ObjectHelper'

// components
import { BackButton } from 'components/BackButton'
import { UploadAvatar } from 'components/UploadAvatar'

// styles
import './EditUserInfoModal.scss'

interface EditUserInfoModalProps extends ModalProps {
    editData?: any
}

export const EditUserInfoModal: React.FC<EditUserInfoModalProps> = observer(({
    visible,
    setVisible,
    editData
}) => {
    const [studyStore] = useState(StudySpaceStore)
    const { id } = useParams<{ id: string }>()
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue
    } = useForm()

    const [file, setFile] = useState<File>()
    const [loaded, setLoaded] = useState<boolean>(true)

    const onSubmitHandler = async (data: any) => {
        setLoaded(false)

        await editData({ 
            ...withoutFailObjectData(data), 
            image: file, 
            group: studyStore.activeGroup.id 
        })

        setLoaded(true)
    }

    const showTitleError = () => {
        switch(errors.firstName && errors.firstName.type) {
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
        switch(errors.email && errors.email.type) {
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

    const onChangeHandler = (ev: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(ev.currentTarget.name, ev.currentTarget.value)
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
                <p className='modal-title' style={{ fontWeight: 'bold' }}>
                    Изменить профиль
                </p>

                <BackButton 
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)} className='edit-user-info-modal'> 
                <div className='uk-margin-top'>
                    <p>Аватар профиля</p>

                    <UploadAvatar 
                        setFile={setFile}
                        icon={(
                            <AiOutlineFileImage
                                size={92} 
                                color='var(--aqua-color)' 
                            />
                        )}
                        title='Выбирите картинку'
                    />
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.firstName ? 'error-text' : ''}`}>
                        Имя

                        <span>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите имя' 
                        className={`${errors.firstName ? 'is-error' : ''}`}
                        maxLength={50}
                        { ...register('firstName', { required: true, maxLength: 50 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.firstName && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showTitleError()}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.lastName ? 'error-text' : ''}`}>
                        Фамилия

                        <span>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите имя' 
                        className={`${errors.lastName ? 'is-error' : ''}`}
                        maxLength={50}
                        { ...register('lastName', { required: true, maxLength: 50 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.lastName && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showTitleError()}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.phone ? 'error-text' : ''}`}>
                        Телефон

                        <span>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите название' 
                        className={`${errors.phone ? 'is-error' : ''}`}
                        maxLength={50}
                        { ...register('phone', { required: false, maxLength: 50 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.phone && (
                            <Alert
                                className='uk-margin-small-top'
                                showIcon
                                type='error'
                                message={showTitleError()}
                            />
                        )
                    }
                </div>

                <div className='uk-margin-top'>
                    <p className={`${errors.email ? 'error-text' : ''}`}>
                        Почта

                        <span>*</span>
                    </p>

                    <Input
                        placeholder='Введите название'
                        className={`${errors.email ? 'is-error' : ''}`}
                        maxLength={500}
                        { ...register('email', { required: false, maxLength: 500 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.email && (
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
                        Изменить
                    </Button>
                </div>
            </form>
        </Modal>
    )
})