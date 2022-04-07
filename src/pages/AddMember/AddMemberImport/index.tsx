import React, { useState } from 'react'
import { AutoComplete, Avatar, Button, Checkbox, notification, Spin } from 'antd'
import { observer } from 'mobx-react'

// components
import { InfoBlock } from 'components/InfoBlock'

// stores
import { MembersStore } from 'store/members'
import { StudySpaceStore } from 'store/studySpace'
import { useHistory } from 'react-router'
import { routes } from 'utils/router'

interface AddMemberImportProps {
    currentBlock: string
    setCurrentBlock: (block: string) => void
    members: string[]
}

export const AddMemberImport: React.FC<AddMemberImportProps> = observer(({
    currentBlock,
    setCurrentBlock,
    members
}) => {
    const [membersStore] = useState(MembersStore)
    const [studyStore] = useState(StudySpaceStore)

    const [users, setUsers] = useState<any[]>([])
    const [teacherTimer, setTeacherTimer] = useState<any>()
    const [selectedUser, setSelectedUser] = useState<string>()
    const [deletePrev, setDeletePrev] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const history = useHistory()

    const onSearchHandler = async (value: string) => {
        if(teacherTimer) clearTimeout(teacherTimer)

        setTeacherTimer(setTimeout(async () => {
            const data = await membersStore.search(value.trim())

            setUsers(data)
        }, 500))
    }   

    const onUserSelectHandler = (_value: string, option: any) => {
        setSelectedUser(option.key)
    }

    const onSubmitHandler = async () => {
        console.log(selectedUser, deletePrev)

        if(!selectedUser) return

        setLoading(true)

        await studyStore.importUser(
            studyStore.activeGroup.id,
            {
                userId: selectedUser,
                deletePrev
            }
        )

        notification.success({
            message: 'Успешно импортировано!',
            description: 'Участник будет добавлен в скором времени.',
            duration: 2
        })

        setLoading(false)
        
        history.push(routes.members.replace(':groupId', studyStore.activeGroup.id))
    }

    return (
        <Spin size='large' spinning={loading}>
            <InfoBlock
                title='Импорт из других групп'
                titleStyle={{ cursor: 'pointer' }}
                bodyStyle={{ marginTop: 20 }}
                hasArrowIcon
                style={{ marginBottom: 15 }}
                isSelected={currentBlock === '1'}
                onClick={() => setCurrentBlock(currentBlock !== '1' ? '1' : '')}
            >
                <div className='uk-flex uk-flex-between uk-margin-bottom'>
                    <AutoComplete
                        className='uk-width-1'
                        onSelect={onUserSelectHandler}
                        placeholder='Введите имя или фамилию'
                        onSearch={onSearchHandler}
                        style={{ marginRight: 15 }}
                        defaultValue=''
                    >
                        {
                            users.map((user) => {
                                const inGroup = members.find((member) => member === user['_id'])

                                if(inGroup) return null

                                return (
                                    <AutoComplete.Option 
                                        disabled={!!inGroup}
                                        key={user['_id']} 
                                        name={user.fullname} 
                                        value={user.fullname || `${user.firstName} ${user.lastName}`}
                                    >
                                        <div className='uk-flex uk-flex-middle'>
                                            <Avatar 
                                                size={22} 
                                                src={user.photoUrl} 
                                                style={{ marginRight: 10 }}
                                            />

                                            <span style={{ fontSize: 14 }}>
                                                { user.fullname || `${user.firstName} ${user.lastName}` }
                                            </span>
                                        </div>
                                    </AutoComplete.Option>
                                )
                            })
                        }
                    </AutoComplete>

                    <Button 
                        type='primary'
                        style={{ height: 42 }}
                        onClick={onSubmitHandler}
                        disabled={!selectedUser}
                    >
                        Импорт
                    </Button>
                </div>
                
                <div className='uk-margin-small-bottom'>
                    <Checkbox 
                        value={deletePrev} 
                        onChange={() => setDeletePrev(!deletePrev)}
                    >
                        Удалить пользователя из предыдущих групп
                    </Checkbox>
                </div>
            </InfoBlock>
        </Spin>
    )
})