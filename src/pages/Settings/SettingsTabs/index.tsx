import React, { useState } from 'react'
import { 
    Empty,
    Pagination,
    Spin, 
    Table, 
    Tabs,
    Tag 
} from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

// utils
import { routes } from 'utils/router'

// components
import { AddButton } from 'components/AddButton'
import { InfoBlock } from 'components/InfoBlock'
import { TokenItem } from 'components/TokenItem'

interface SettingsTabsProps {
    loaded?: boolean
    addDisabled?: boolean
    data?: any[]
    tokens?: any[]
    page?: number
    allCount?: number
    setPage?: (page: number) => void
    onAdd?: () => void
}

export const SettingsTabs: React.FC<SettingsTabsProps> = observer(({
    loaded,
    addDisabled,
    data = [],
    tokens = [],
    page = 1,
    allCount = 1,
    setPage = () => null,
    onAdd
}) => {
    const [activeKey, setActiveKey] = useState<string>('1')

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
            render: (role: any, { isTeacher }: any) => (
                <div style={{ width: 100 }}>
                    <Tag color={role.color}>
                        { isTeacher ? 'Преподаватель' : role.name }
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
        <Tabs 
            size='middle' 
            defaultActiveKey={activeKey}
            tabBarExtraContent={ 
                activeKey === '2' && {
                    right: (
                        <AddButton 
                            style={{ height: 32 }}
                            title='Создать токен'
                            disabled={addDisabled} 
                            onClick={onAdd}
                        />
                    )
                }
            }
            onChange={(key) => setActiveKey(key.toString())}
            style={{ padding: 0, border: 'none', boxShadow: 'none' }}
        >   
            <Tabs.TabPane tab='Участники' key='1'>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <Spin spinning={!loaded} size='large'>
                        <Table
                            columns={cols}
                            dataSource={data}
                            showSorterTooltip={false}
                            pagination={false}
                            bordered
                            style={{ 
                                minWidth: 1300,
                                maxWidth: '100%',
                                borderRadius: 12
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
                                total={allCount || 10} 
                                style={{ marginTop: 20 }}
                                onChange={setPage}
                            />
                        </div>
                    )
                }
            </Tabs.TabPane>

            <Tabs.TabPane tab='Токены' key='2'>
                <p className='uk-margin-medium-bottom'>
                    <b>Токены</b>
                    
                    &nbsp;

                    - это специальный текст, в котором хранятся 
                    данные для регистрации. Они используются вместе с
                    ссылками на странице регистрации.

                    <br />

                    Один токен для для одного пользователя, 
                    и имеет срок действия, по стандарту 
                    это 1 месяц.

                    <br />

                    На каждую группу стоит ограничение в 10 токенов, 
                    с возможностью удалять старые и добавлять новые.

                    <br />
                    <br />

                    <b>
                        Вы можете получить ссылку с токеном - просто нажав на токен.
                    </b>
                </p>

                <Spin spinning={!loaded} size='large'>
                    <InfoBlock
                        bodyStyle={{ marginTop: 30 }}
                        title={(
                            <Tag 
                                color={!addDisabled ? 'success' : 'warning'}
                                style={{ 
                                    fontSize: 16, 
                                    height: 42, 
                                    width: 'max-content',
                                    display: '-webkit-flex',
                                    paddingLeft: 15,
                                    paddingRight: 15
                                }}
                                className='uk-flex-middle'
                            >
                                Добавлено

                                &nbsp;

                                {`${tokens.length} из 10`}
                            </Tag>
                        )}
                    >
                        <div className='main-settings__content__list'>
                            {
                                tokens.length ? (
                                    tokens.map((token, index: number) => (
                                        <TokenItem 
                                            key={index} 
                                            // onDelete={() => onDeleteHandler(token.token)}
                                            { ...token }
                                        />
                                    ))
                                )    
                                : (
                                    <Empty 
                                        description='Здесь пусто!' 
                                        className='uk-margin-top uk-margin-bottom'
                                    />
                                )
                            }
                        </div>
                    </InfoBlock>
                </Spin>
            </Tabs.TabPane>
        </Tabs>
    )
})