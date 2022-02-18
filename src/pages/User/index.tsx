import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { 
    Avatar, 
    Descriptions, 
    Result, 
    Spin, 
    Tag 
} from 'antd'
import { observer } from 'mobx-react'
import moment from 'moment'

// components
import { InfoBlock } from 'components/InfoBlock'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { UserStore } from 'store/user'
import { AuthStore } from 'store/auth'

// styles
import './User.scss'

export const UserContainer: React.FC = observer(() => {
    const [authStore] = useState(AuthStore)
    const { id } = useParams<{ id: string }>()
    const [userStore] = useState(UserStore)
    const { rename } = usePageTitle('OrionIO | ')

    const {
        firstName,
        lastName,
        middleName,
        photoUrl,
        role,
        phone,
        studySpace,
        email,
        birthDay,
        createdAt
    } = userStore.data

    useEffect(() => {
        if(userStore.data.id !== id) userStore.getById(id)
    }, [id])

    useEffect(() => {
        if(id === authStore.user.id) {
            rename('Профиль')
        }
        else {
            rename(`${lastName} ${firstName} ${middleName || ''}`)
        }
    }, [userStore.data])

    return (
        <div>
            {
                userStore.hasError ? (
                    <Result 
                        status='404' 
                        title='Пользователь не найден!'
                        className='uk-margin-medium-top'
                    />
                )
                : (
                    userStore.loaded ? (
                        <>
                            <div className='user-page__main-info'>
                                <div className='user-page__main-info__grid uk-margin-medium-bottom'>
                                    <Avatar 
                                        src={photoUrl}
                                        size={140} 
                                        style={{ borderRadius: 12 }}
                                    />

                                    <div className='user-page__main-info__right'>
                                        <h3 
                                            style={{ 
                                                marginBottom: '.3em', 
                                                fontSize: 28, 
                                                fontWeight: 600 
                                            }}
                                        >
                                            { lastName }

                                            &nbsp;

                                            { firstName }

                                            { middleName ? ` ${middleName}` : '' }
                                        </h3>

                                        <Tag 
                                            color={role.color}
                                            className='uk-margin-bottom'
                                        >
                                            { role.name }
                                        </Tag>
                                    </div>
                                </div>
                                
                                <InfoBlock 
                                    style={{ width: '100%', padding: 0, boxShadow: '' }} 
                                    title=''
                                >
                                    <Descriptions 
                                        column={1} 
                                        bordered
                                    >
                                        <Descriptions.Item 
                                            label={(
                                                <b>Телефон</b>
                                            )}
                                            labelStyle={{ width: 250 }}
                                        >
                                            { phone || 'Неизвестно' }
                                        </Descriptions.Item>

                                        <Descriptions.Item 
                                            label={(
                                                <b>Почта</b>
                                            )}
                                        >
                                            { email || 'Неизвестно' }
                                        </Descriptions.Item>

                                        <Descriptions.Item 
                                            label={(
                                                <b>Учебное пространство</b>
                                            )}
                                        >
                                            { studySpace.name }
                                        </Descriptions.Item>

                                        <Descriptions.Item
                                            label={(
                                                <b>Дата рождения</b>
                                            )}
                                        >
                                            { 
                                                birthDay ? (
                                                    moment(birthDay).format('D MMMM YYYY') 
                                                ) 
                                                : (
                                                    'Неизвестно' 
                                                )
                                            }
                                        </Descriptions.Item>

                                        <Descriptions.Item
                                            label={(
                                                <b>Дата регистрации</b>
                                            )}
                                        >
                                            { moment(createdAt).format('D MMMM YYYY') }
                                        </Descriptions.Item>
                                    </Descriptions>
                                </InfoBlock>
                            </div>
                        </>
                    )
                    : (
                        <Spin 
                            size='large' 
                            style={{ width: '100%', marginTop: '25vh' }}
                        />
                    )
                )
            }
        </div>
    )
})