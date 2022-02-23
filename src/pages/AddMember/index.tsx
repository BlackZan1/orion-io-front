import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { 
    Button,
    Empty, 
    notification, 
    Popover, 
    Spin, 
    Tag 
} from 'antd'

// components
import { AddButton } from 'components/AddButton'
import { InfoBlock } from 'components/InfoBlock'
import { TokenItem } from 'components/TokenItem'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { TokensStore } from 'store/tokens'
import { StudySpaceStore } from 'store/studySpace'
import { RolesStore } from 'store/roles'

// styles
import './AddMember.scss'

export const AddMemberContainer: React.FC = observer(() => {
    const [tokensStore] = useState(TokensStore)
    const [studyStore] = useState(StudySpaceStore)
    const [rolesStore] = useState(RolesStore)
    const { rename } = usePageTitle('')

    const [loading, setLoading] = useState<boolean>(false)

    const { id: groupId } = studyStore.activeGroup

    useEffect(() => {
        tokensStore.getById(groupId)
    }, [groupId])

    useEffect(() => {
        rename(`${studyStore.activeGroup.name} | Добавить участника`)
    }, [])

    const onTokenAddHandler = async (type: 'admin' | 'superUser' | 'user') => {
        setLoading(true)

        await tokensStore.generate(groupId, type)

        setLoading(false)

        notification.success({
            message: 'Токен сгенерировался!',
            description: 'Помните, срок действия токена 1 день.',
            duration: 4
        })
    }

    const onDeleteHandler = async (token: string) => {
        setLoading(true)

        await tokensStore.delete(token)

        setLoading(false)
    }

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
                                        rolesStore.data.map((role, index) => {
                                            const lastItem = index + 1 === rolesStore.data.length

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
                                disabled={!tokensStore.isAbleToAdd} 
                                // onClick={() => onTokenAddHandler()}
                            />
                        </Popover>

                        <Tag 
                            color={tokensStore.isAbleToAdd ? 'success' : 'warning'}
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

                            {`${tokensStore.tokensCount} из 10`}
                        </Tag>
                    </div>
                )}
            >
                <div className='add-member__list'>
                    {
                        tokensStore.tokensCount ? (
                            tokensStore.data.map((token, index: number) => (
                                <TokenItem 
                                    key={index} 
                                    onDelete={() => onDeleteHandler(token.token)}
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
    )

    return (
        <div>
            <Spin spinning={!tokensStore.loaded} size='large'>
                <InfoBlock
                    title='Токены регистрации'
                    bodyStyle={{ marginTop: 20 }}
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
                        это 1 день.

                        <br />

                        На каждую группу стоит ограничение в 10 токенов, 
                        с возможностью удалять старые и добавлять новые.

                        <br />
                        <br />

                        <b>
                            Вы можете получить ссылку с токеном - просто нажав на токен.
                        </b>
                    </p>

                    {
                        tokensStore.loaded && (
                            innerBlock
                        )
                    }
                </InfoBlock>
            </Spin>
        </div>
    )
})