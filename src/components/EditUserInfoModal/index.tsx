import React, { SyntheticEvent, useState } from 'react'
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
    const [userStore] = useState(UserStore)
    const [studyStore] = useState(StudySpaceStore)
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

        // await userStore.editProfile({ 
        //     ...data, 
        //     image: file, 
        //     group: studyStore.activeGroup.id 
        // })

        console.log(data)

        setLoaded(true)
    }

    const showTitleError = () => {
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
        switch(errors.email.type) {
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
                    <p className={`${errors.name ? 'error-text' : ''}`}>
                        Имя

                        <span>*</span>
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите имя' 
                        className={`${errors.name ? 'is-error' : ''}`}
                        maxLength={50}
                        { ...register('name', { required: true, maxLength: 50 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.name && (
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
                        { ...register('phone', { required: true, maxLength: 50 }) }
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

                    <Input.TextArea
                        placeholder='Введите описание' 
                        autoSize={{
                            maxRows: 4,
                            minRows: 3
                        }}
                        className={`${errors.email ? 'is-error' : ''}`}
                        maxLength={500}
                        showCount
                        { ...register('email', { required: true, maxLength: 500 }) }
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