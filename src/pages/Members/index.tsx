import React, { useEffect, useState } from 'react'
import { 
    Pagination, 
    Spin, 
    Table, 
    Tag 
} from 'antd'
import moment from 'moment'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

// components
import { InfoBlock } from 'components/InfoBlock'
import { AddButton } from 'components/AddButton'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { MembersStore } from 'store/members'
import { StudySpaceStore } from 'store/studySpace'
import { AuthStore } from 'store/auth'
import { RolesStore } from 'store/roles'

// utils
import { routes } from 'utils/router'

// styles
import './Members.scss'

export const MembersContainer: React.FC = observer(() => {
    const [membersStore] = useState(MembersStore)
    const [studyStore] = useState(StudySpaceStore)
    const [authStore] = useState(AuthStore)
    const [rolesStore] = useState(RolesStore)
    const [page, setPage] = useState<number>(1)
    const [loaded, setLoaded] = useState<boolean>(false)
    const { rename } = usePageTitle('')
    const history = useHistory()

    const { id: groupId } = studyStore.activeGroup

    useEffect(() => {
        if(membersStore.loaded) {
            setLoaded(true)

            return 
        }

        (async () => {
            await membersStore.getAll(groupId, 1)

            setLoaded(true)
        })()
    }, [loaded, membersStore.loaded])

    useEffect(() => {
        rename(`${studyStore.activeGroup.name} | Участники`)
    }, [])

    const goToAddMember = () => {
        history.push(routes.addMember.replace(':groupId', groupId))
    }
    
    const onPageChangeHandler = (newPage: number) => {
        setPage(newPage)

        membersStore.getAll(groupId, newPage)
    }

    const cols = [
        {
            title: 'ФИО',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (firstName: string, { lastName, middleName, id }: any) => (
                <Link 
                    className='uk-text-bold' 
                    style={{ 
                        marginBottom: 0, 
                        color: 'unset', 
                        width: 250,
                        display: 'inline-block'
                    }}
                    to={routes.user.replace(':id', id)}
                >
                    { lastName }

                    &nbsp;

                    { firstName }

                    { middleName ? ` ${middleName}` : '' }
                </Link>
            )
        },
        {
            title: 'Роли',
            dataIndex: 'role',
            key: 'role',
            render: (role: any) => (
                <div style={{ width: 100 }}>
                    <Tag color={role.color}>
                        { role.name }
                    </Tag>
                </div>
            )
        },
        {
            title: 'Почта',
            dataIndex: 'email',
            key: 'email',
            render: (email: any) => (
                <a style={{ width: '100%' }} href={`mailto:${email}`}>
                    { email }
                </a>
            )
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone: any) => (
                phone ? (
                    <a style={{ width: '100%' }} href={`tel:${phone}`}>
                        { phone }
                    </a>
                )
                : (
                    'Неизвестно'
                )
            )
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthDay',
            key: 'birthDay',
            render: (birthDay: string) => (
                <p style={{ width: 135 }}>
                    { 
                        birthDay ? (
                            moment(birthDay).format('DD MMMM YYYY') 
                        )
                        : (
                            'Неизвестно'
                        )
                    }
                </p>
            )
        },
    ]

    return (
        <div>
            <div className='members__grid'>
                <Spin spinning={!loaded} size='large'>
                    <InfoBlock 
                        title='Всего участников:'
                        style={{ paddingTop: 10, paddingBottom: 10, height: 87 }}
                    >
                        <div className='members__count'>
                            { membersStore.allCount }
                        </div>
                    </InfoBlock>
                </Spin>

                <Spin spinning={!loaded} size='large'>
                    <InfoBlock 
                        title={null}
                        style={{ paddingTop: 10, paddingBottom: 10, height: 87 }}
                    >
                        <div className='members__card-grid'>
                            {
                                rolesStore.user && (
                                    <div style={{ borderRight: '1px solid var(--grey-3-color)' }}>
                                        <Tag 
                                            color={rolesStore.user.color} 
                                            style={{ marginTop: 5, marginBottom: 10 }}
                                        >
                                            { rolesStore.user.name }
                                        </Tag>

                                        <div className='members__count'>
                                            {
                                                membersStore.userCount
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            {
                                rolesStore.superUser && (
                                    <div style={{ borderRight: '1px solid var(--grey-3-color)' }}>
                                        <Tag 
                                            color={rolesStore.superUser.color} 
                                            style={{ marginTop: 5, marginBottom: 10 }}
                                        >
                                            { rolesStore.superUser.name }
                                        </Tag>

                                        <div className='members__count'>
                                            {
                                                membersStore.superUserCount
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            {
                                rolesStore.admin && (
                                    <div>
                                        <Tag 
                                            color={rolesStore.admin.color}
                                            style={{ marginTop: 5, marginBottom: 10 }}
                                        >
                                            { rolesStore.admin.name }
                                        </Tag>

                                        <div className='members__count'>
                                            {
                                                membersStore.adminCount
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </InfoBlock>
                </Spin>
            </div>

            <div 
                className='members__table'
            >
                {
                    authStore.isAdmin && (
                        <AddButton 
                            title='Добавить участника'
                            onClick={goToAddMember}
                        />
                    )
                }
                
                <div className='members__table__wrapper'> 
                    <Spin spinning={!membersStore.loaded} size='large'>
                        <Table 
                            columns={cols}
                            dataSource={membersStore.data}
                            showSorterTooltip={false}
                            pagination={false}
                            bordered
                            className={`${authStore.isAdmin ? 'is-admin' : ''}`}
                            style={{ 
                                minWidth: 1300,
                                maxWidth: '100%'
                            }}
                        />
                    </Spin>
                </div>

                {
                    loaded && (
                        <div className='uk-flex-column uk-flex-end'>
                            <Pagination
                                current={page}
                                defaultPageSize={10}
                                total={membersStore.allCount} 
                                style={{ marginTop: 20 }}
                                onChange={onPageChangeHandler}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
})