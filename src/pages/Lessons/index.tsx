import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Empty, Input, Spin } from 'antd'
import { observer } from 'mobx-react'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// components
import { InfoBlock } from 'components/InfoBlock'
import { AddButton } from 'components/AddButton'
import { AddGroupLessonModal } from 'components/AddGroupLessonModal'
import { LessonItem } from 'components/LessonItem'

// stores
import { GroupLessonsStore } from 'store/groupLessons'
import { StudySpaceStore } from 'store/studySpace'
import { AuthStore } from 'store/auth'

// styles
import './Lessons.scss'

export const LessonsContainer: React.FC = observer(() => {
    const [groupLessonsStore] = useState(GroupLessonsStore)
    const [authStore] = useState(AuthStore)
    const [studyStore] = useState(StudySpaceStore)
    const { rename } = usePageTitle('')

    // const [value, setValue] = useState<string>()
    const [options, setOptions] = useState<any[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [timer, setTimer] = useState<any>()

    const [editData, setEditData] = useState<any>()

    const { id: groupId, name: groupName } = studyStore.activeGroup

    useEffect(() => {
        groupLessonsStore.getAll(groupId)

        return () => {
            groupLessonsStore.getAll(groupId)
        }
    }, [groupId])

    useEffect(() => {
        setOptions(groupLessonsStore.data)
    }, [groupLessonsStore.data])

    useEffect(() => {
        rename(`${groupName} | Занятия`)
    }, [])

    const onChangeHandler = async (ev: SyntheticEvent<HTMLInputElement>) => {
        const { value } = ev.currentTarget

        if(!!timer) clearTimeout(timer)

        if(value.trim().length) {
            setTimer(setTimeout(async () => {
                groupLessonsStore.loaded = false

                const data = await groupLessonsStore.search(groupId, value)

                setOptions(data)

                groupLessonsStore.loaded = true
            }, 150))
        }
        else setOptions(groupLessonsStore.data)
    }

    const onLessonDelete = async (lessonId: string) => {
        groupLessonsStore.loaded = false

        await groupLessonsStore.delete(groupId, lessonId)

        groupLessonsStore.loaded = true
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
                            className='uk-width-1'
                            style={{ width: authStore.isAdmin ? 'calc(100% - 140px)' : '100%' }}
                            placeholder='Введите для поиска'
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

                    {
                        options.length <= 0 && (
                            <Empty 
                                style={{ marginTop: '20vh' }}
                                description={(
                                    <p>
                                        {
                                            !groupLessonsStore.loaded ? (
                                                'Загрузка...'
                                            )
                                            : (
                                                <>
                                                    Занятий нет!

                                                    {
                                                        authStore.isAdmin && (
                                                            <>
                                                                <br />

                                                                Вы можете добавить новое занятие
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </p>
                                )}
                            />
                        )
                    }

                    <div className='lessons__grid'>
                        {
                            options.map((item) => (
                                <LessonItem 
                                    key={item.id} 
                                    { ...item }
                                    onDelete={() => onLessonDelete(item.id)}
                                    isEditable={authStore.isAdmin}
                                    setEdit={() => {
                                        setEditData(item)
                                        setModal(true)
                                    }}
                                />
                            ))
                        }
                    </div>
                </InfoBlock>
            </Spin>

            <AddGroupLessonModal 
                visible={modal}
                setVisible={setModal}
                editData={editData}
            />
        </>
    )
})