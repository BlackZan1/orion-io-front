import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
    Alert, 
    Button, 
    Input, 
    Modal, 
    notification 
} from 'antd'
import { observer } from 'mobx-react'

// utils
import { ModalProps } from 'interfaces/modal'

// components
import { BackButton } from 'components/BackButton'

// stores
import { StudySpaceStore } from 'store/studySpace'

interface GroupRenameModalProps extends ModalProps {
    defaultValue: string
    groupId: string
}

export const GroupRenameModal: React.FC<GroupRenameModalProps> = observer(({
    visible,
    setVisible,
    defaultValue,
    groupId
}) => {
    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors },
        reset
    } = useForm()
    const [loaded, setLoaded] = useState<boolean>(true)
    const [studyStore] = useState(StudySpaceStore)

    useEffect(() => {
        setValue('name', defaultValue)

        return () => {
            reset()
        }
    }, [defaultValue])

    const onSubmitHandler = async (data: any) => {
        setLoaded(false)

        await studyStore.renameGroup(groupId, data.name)

        notification.success({
            message: 'Успешно обновлено!',
            duration: 2
        })

        setLoaded(true)
        setVisible(false)

        reset()
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

    const onInputChangeHandler = (ev: SyntheticEvent<HTMLInputElement>) => {
        const { name, value } = ev.currentTarget

        setValue(name, value as string)
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
                    Переименовать группу
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
                        maxLength={50}
                        { ...register('name', { required: true, maxLength: 50 }) }
                        onChange={onInputChangeHandler}
                        defaultValue={defaultValue}
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

                <div className='uk-margin-large-top uk-flex uk-flex-center'>
                    <Button
                        type='primary'
                        style={{ height: 42 }}
                        className='uk-width-1-2'
                        htmlType='submit'
                        loading={!loaded}
                    >
                        Переименовать
                    </Button>
                </div>
            </form>
        </Modal>
    )
})