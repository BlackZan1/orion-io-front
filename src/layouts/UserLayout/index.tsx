import React, { useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router'
import { observer } from 'mobx-react'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineLogout } from 'react-icons/md'
import { Button, Popconfirm } from 'antd'

// components
import { Sidebar } from 'components/Sidebar'
import { UserInfo } from 'components/UserInfo'
import { BackButton } from 'components/BackButton'
import { PreloaderPage } from 'pages/PrealoderPage'

// stores
import { AuthStore } from 'store/auth'

// hooks
import { useLocaleStorage } from 'hooks/localStorage.hook'

// utils
import { routes } from 'utils/router'

export const UserLayout: React.FC<any> = observer(({
    children,
    className
}) => {
    const history = useHistory()
    const { value: tokenValue } = useLocaleStorage('orion_t')
    const [authStore] = useState(AuthStore)
    const { id } = useParams<any>()

    if(authStore.auth === null && !!tokenValue) return <PreloaderPage />
    if(authStore.auth === false) return <Redirect to={routes.auth.signin} />

    const isOwn = id === authStore.user.id

    return (
        <div className={className}>
            <Sidebar />

            <div className='main-content'>
                <div className='is-mobile'>
                    <div 
                        className='main-content__header uk-flex uk-flex-middle'
                    >
                        <UserInfo />
                    </div>
                </div>
                        
                <div className='main-content__title uk-flex uk-flex-middle uk-flex-between'>
                    <BackButton 
                        onClick={() => history.goBack()}
                        type='ghost'
                        style={{ 
                            height: 42, 
                            background: 'var(--white-color)',
                            padding: '0 15px' 
                        }}
                    />

                    {
                        isOwn && (
                            <div 
                                className='uk-flex uk-flex-middle'
                                style={{ height: 78 }}
                            >
                                <Button
                                    type='ghost'
                                    style={{ 
                                        height: 42, 
                                        background: 'var(--white-color)',
                                        margin: '0 10px'
                                    }}
                                >
                                    <div className='uk-flex uk-flex-middle'>
                                        <AiOutlineEdit size={22} />

                                        &nbsp;

                                        Изменить
                                    </div>
                                </Button>

                                <Popconfirm
                                    placement='bottomRight'
                                    title='Вы действительно хотите выйты?'
                                    okText='Да'
                                    cancelText='Нет'
                                    onConfirm={() => authStore.logout()}
                                >
                                    <Button
                                        type='ghost'
                                        style={{ height: 42, background: 'var(--white-color)' }}
                                    >
                                        <div className='uk-flex uk-flex-middle'>
                                            <MdOutlineLogout size={22} />

                                            &nbsp;

                                            Выйти
                                        </div>
                                    </Button>
                                </Popconfirm>
                            </div>
                        )
                    }
                </div>

                <div>
                    { children }
                </div>
            </div>
        </div>
    )
})