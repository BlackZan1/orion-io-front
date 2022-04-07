import React from 'react'
import { Button, Empty, Popover, Spin, Tag } from 'antd'

// components
import { InfoBlock } from 'components/InfoBlock'
import { AddButton } from 'components/AddButton'
import { TokenItem } from 'components/TokenItem'

interface AddMemderTokensProps {
    currentBlock: string
    setCurrentBlock: (block: string) => void
    admin: any
    tokensCount: number
    loading: boolean
    isAbleToAdd: boolean
    tokensLoaded: boolean
    rolesData: any[]
    onTokenAddHandler: (value: 'admin' | 'superUser' | 'user') => void
    data: any[]
    setLoading?: (loading: boolean) => void
    setModal: (v: boolean) => void
    setModalData: (data: any) => void
}

export const AddMemderTokens: React.FC<AddMemderTokensProps> = ({
    currentBlock,
    setCurrentBlock,
    admin,
    tokensCount,
    loading,
    isAbleToAdd,
    tokensLoaded,
    rolesData,
    onTokenAddHandler,
    data,
    setLoading,
    setModal,
    setModalData
}) => {
    const innerBlock = (
        <Spin spinning={loading} size='large'>
            <InfoBlock
                bodyStyle={{ marginTop: 30 }}
                title={(
                    <div className='uk-flex uk-flex-between uk-flex-middle'>
                        <Popover
                            style={{ width: 300 }}
                            placement='top'
                            content={(
                                <div className='uk-flex uk-flex-column'>
                                    <p
                                        style={{ fontSize: 16 }}
                                        className='uk-margin-bottom uk-text-middle uk-text-bold'
                                    >
                                        Выберите роль для регистрации:
                                    </p>

                                    {
                                        rolesData.map((role, index) => {
                                            const lastItem = index + 1 === rolesData.length

                                            if(role.value === 'admin') return null

                                            return (
                                                <Button
                                                    className={`${lastItem ? '' : 'uk-margin-small-bottom'}`}
                                                    style={{ height: 36 }}
                                                    onClick={() => onTokenAddHandler(role.value)}
                                                >
                                                    { role.name }
                                                </Button>
                                            )
                                        })
                                    }
                                </div>
                            )}
                            trigger='click'
                        >
                            <AddButton
                                title='Добавить токен'
                                disabled={!isAbleToAdd} 
                            />
                        </Popover>

                        <Tag
                            color={isAbleToAdd ? 'success' : 'warning'}
                            style={{ 
                                fontSize: 16, 
                                height: 42, 
                                display: '-webkit-flex',
                                paddingLeft: 15,
                                paddingRight: 15
                            }}
                            className='uk-flex-middle'
                        >
                            Добавлено

                            &nbsp;

                            {`${tokensCount} из 10`}
                        </Tag>
                    </div>
                )}
            >
                <div className='add-member__list'>
                    {
                        tokensCount ? (
                            data.map((token, index: number) => (
                                <TokenItem 
                                    key={index} 
                                    setLoading={setLoading}
                                    { ...token }
                                    setModal={setModal}
                                    setModalData={setModalData}
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
    )

    return (
        <InfoBlock
            title='Токены регистрации'
            titleStyle={{ cursor: 'pointer' }}
            bodyStyle={{ marginTop: 20 }}
            hasArrowIcon
            isSelected={currentBlock === '2'}
            onClick={() => setCurrentBlock(currentBlock !== '2' ? '2' : '')}
        >
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

                <br />
                <br />

                Такие роли как (

                { admin.name } 
                
                ) добавляются в настройках учебной системы!
            </p>

            {
                tokensLoaded && (
                    innerBlock
                )
            }
        </InfoBlock>
    )
}