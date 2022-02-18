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
import { NewsStore } from 'store/news'
import { StudySpaceStore } from 'store/studySpace'

// interfaces
import { ModalProps } from 'interfaces/modal'

// components
import { BackButton } from 'components/BackButton'
import { UploadAvatar } from 'components/UploadAvatar'

// styles
import './AddNewsModal.scss'

interface AddNewsModalProps extends ModalProps {}

export const AddNewsModal: React.FC<AddNewsModalProps> = observer(({
    visible,
    setVisible
}) => {
    const [newsStore] = useState(NewsStore)
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

        await newsStore.create({ 
            ...data, 
            image: file, 
            group: studyStore.activeGroup.id 
        })

        setLoaded(true)
    }

    const showTitleError = () => {
        switch(errors.title.type) {
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
                <p style={{ fontWeight: 'bold' }}>
                    Добавить новость
                </p>

                <BackButton 
                    onClick={() => setVisible(false)}
                    isIcon
                />
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)} className='add-news-modal'> 
                <div className='uk-margin-top'>
                    <p className={`${errors.title ? 'error-text' : ''}`}>
                        Название новости
                    </p>

                    <Input
                        style={{ height: 42 }} 
                        placeholder='Введите название' 
                        className={`${errors.title ? 'is-error' : ''}`}
                        maxLength={50}
                        { ...register('title', { required: true, maxLength: 50 }) }
                        onChange={onChangeHandler}
                    />

                    {
                        errors.title && (
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
                    <p className={`${errors.details ? 'error-text' : ''}`}>
                        Описание новости
                    </p>

                    <Input.TextArea
                        placeholder='Введите описание' 
                        autoSize={{
                            maxRows: 4,
                            minRows: 3
                        }}
                        className={`${errors.title ? 'is-error' : ''}`}
                        maxLength={500}
                        showCount
                        { ...register('details', { required: true, maxLength: 500 }) }
                        onChange={onChangeHandler}
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
                    <p>Картинка новости</p>

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