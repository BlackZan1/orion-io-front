import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Input, Spin } from 'antd'
import { observer } from 'mobx-react'

// components
import { InfoBlock } from 'components/InfoBlock'
import { AddButton } from 'components/AddButton'
import { AddGroupLessonModal } from 'components/AddGroupLessonModal'

// stores
import { GroupLessonsStore } from 'store/groupLessons'
import { StudySpaceStore } from 'store/studySpace'
import { AuthStore } from 'store/auth'

// styles
import './Lessons.scss'
import { LessonItem } from 'components/LessonItem'

export const LessonsContainer: React.FC = observer(() => {
    const [groupLessonsStore] = useState(GroupLessonsStore)
    const [authStore] = useState(AuthStore)
    const [studyStore] = useState(StudySpaceStore)

    const [value, setValue] = useState<string>()
    const [modal, setModal] = useState<boolean>(false)
    const [timer, setTimer] = useState<any>()

    const { id: groupId } = studyStore.activeGroup

    useEffect(() => {
        groupLessonsStore.getAll(groupId)

        return () => {
            groupLessonsStore.getAll(groupId)
        }
    }, [groupId])

    const onChangeHandler = (ev: SyntheticEvent<HTMLInputElement>) => {
        const { value: newValue } = ev.currentTarget

        setValue(newValue)

        if(!!timer) clearTimeout(timer)

        if(newValue.trim().length) {
            setTimer(setTimeout(() => {
                groupLessonsStore.getAll(groupId, newValue)
            }, 750))
        }
    }

    return (
        <>
            {
                authStore.isAdmin && (
                    <div className='lessons__mobile-btn'>
                        <AddButton 
                            title='Создать' 
                            onClick={() => setModal(true)}
                        />
                    </div>
                )
            }

            <Spin 
                spinning={!groupLessonsStore.loaded} 
                size='large'
            >
                <InfoBlock 
                    title={null}
                    style={{ minHeight: 'calc(100vh - 138px)' }}
                >
                    <div className='lessons__header'>
                        <Input 
                            style={{ width: authStore.isAdmin ? 'calc(100% - 140px)' : '100%' }}
                            className='uk-width-1'
                            placeholder='Введите для поиска'
                            value={value}
                            onChange={onChangeHandler}
                        />

                        {
                            authStore.isAdmin && (
                                <AddButton 
                                    title='Создать' 
                                    onClick={() => setModal(true)}
                                />
                            )
                        }
                    </div>

                    <div className='lessons__grid'>
                        {
                            groupLessonsStore.data.map((item) => (
                                <LessonItem 
                                    key={item.id} 
                                    { ...item }
                                    isEditable={authStore.isAdmin}
                                />
                            ))
                        }
                    </div>
                </InfoBlock>
            </Spin>

            <AddGroupLessonModal 
                visible={modal}
                setVisible={setModal}
            />
        </>
    )
})