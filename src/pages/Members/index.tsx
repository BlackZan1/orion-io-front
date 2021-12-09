import React from 'react'
import { Table, Tag } from 'antd'
import moment from 'moment'

// components
import { InfoBlock } from 'components/InfoBlock'

// styles
import './Members.scss'

const bd = moment()
    .clone()
    .set('days', 24)
    .set('months', 7)
    .set('years', 2002)

export const MembersContainer: React.FC = () => {
    const cols = [
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, { lastName }: any) => (
                <p 
                    style={{ 
                        width: 200, 
                        color: 'var(--aqua-color)',
                        fontWeight: 600
                    }}
                >
                    { lastName }

                    {' '}

                    { name }
                </p>
            )
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthDay',
            key: 'birthDay',
            render: (birthDay: string) => (
                <p style={{ width: 135 }}>
                    { moment(birthDay).format('DD MMMM YYYY') }
                </p>
            )
        },
        {
            title: 'Роли',
            dataIndex: 'role',
            key: 'role',
            render: (role: any) => (
                <div style={{ width: 100 }}>
                    { 
                        role === 1 ? (
                            <Tag color='processing'>Куратор</Tag>

                        ) 
                        : (
                            <Tag color='warning'>Студент</Tag>
                        )
                    }
                </div>
            )
        },
        {
            title: 'О себе',
            dataIndex: 'about',
            key: 'about',
            render: (about: any) => (
                <div style={{ width: '100%' }}>
                    { about }
                </div>
            )
        },
    ]

    const data = [
        {
            key: '1',
            name: 'Жазгуль',
            lastName: 'Эже',
            birthDay: bd,
            role: 1,
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quaerat nemo veritatis neque doloribus. Dolores culpa esse possimus repudiandae ab architecto optio corporis ducimus! Atque nostrum unde nesciunt sapiente illo.'
        },
        {
            key: '2',
            name: 'Назар',
            lastName: 'Саалиев',
            birthDay: bd,
            role: 0,
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quaerat nemo veritatis neque doloribus. Dolores culpa esse possimus repudiandae ab architecto optio corporis ducimus! Atque nostrum unde nesciunt sapiente illo.'
        },
        {
            key: '3',
            name: 'Ариет',
            lastName: 'Ариет',
            birthDay: bd,
            role: 0,
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quaerat nemo veritatis neque doloribus. Dolores culpa esse possimus repudiandae ab architecto optio corporis ducimus! Atque nostrum unde nesciunt sapiente illo.'
        },
        {
            key: '4',
            name: 'Ислам',
            lastName: 'Панда',
            birthDay: bd,
            role: 0,
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quaerat nemo veritatis neque doloribus. Dolores culpa esse possimus repudiandae ab architecto optio corporis ducimus! Atque nostrum unde nesciunt sapiente illo.'
        },
        {
            key: '5',
            name: 'Искендер',
            lastName: 'Жираф',
            birthDay: bd,
            role: 0,
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quaerat nemo veritatis neque doloribus. Dolores culpa esse possimus repudiandae ab architecto optio corporis ducimus! Atque nostrum unde nesciunt sapiente illo.'
        },
        {
            key: '6',
            name: 'Нурдин',
            lastName: 'Жив',
            birthDay: bd,
            role: 0,
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quaerat nemo veritatis neque doloribus. Dolores culpa esse possimus repudiandae ab architecto optio corporis ducimus! Atque nostrum unde nesciunt sapiente illo.'
        }
    ]

    return (
        <div>
            <div className='members__grid'>
                <InfoBlock 
                    title='Всего участников'
                    content={(
                        <div className='members__count'>
                            18
                        </div>
                    )}
                />

                <InfoBlock 
                    title={(
                        <>
                            <Tag color='warning'>Студент</Tag>
                        </>
                    )}
                    content={(
                        <div className='members__count'>
                            16
                        </div>
                    )}
                />

                <InfoBlock 
                    title={(
                        <>
                            <Tag color='processing'>Куратор</Tag>
                        </>
                    )}
                    content={(
                        <div className='members__count'>
                            2
                        </div>
                    )}
                />
            </div>

            <div className='members__table'>
                <Table 
                    columns={cols}
                    dataSource={data}
                    showSorterTooltip={false}
                    pagination={false}
                    style={{ 
                        marginTop: 20, 
                        width: 1300, 
                        maxWidth: 1300 
                    }}
                />
            </div>
        </div>
    )
}