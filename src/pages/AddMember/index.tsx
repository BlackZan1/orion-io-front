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

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { TokensStore } from 'store/tokens'
import { StudySpaceStore } from 'store/studySpace'
import { RolesStore } from 'store/roles'

// components
import { NotificationModal } from 'components/NotificationModal'
import { AddMemderTokens } from './AddMemberTokens'
import { AddMemberImport } from './AddMemberImport'

// styles
import './AddMember.scss'

export const AddMemberContainer: React.FC = observer(() => {
    const [tokensStore] = useState(TokensStore)
    const [studyStore] = useState(StudySpaceStore)
    const [rolesStore] = useState(RolesStore)
    const { rename } = usePageTitle('')

    const [currentBlock, setCurrentBlock] = useState<string>('1')
    const [modal, setModal] = useState<boolean>(false)
    const [modalData, setModalData] = useState<any>({
        title: '',
        content: ''
    })
    const [loading, setLoading] = useState<boolean>(false)

    const { id: groupId, members } = studyStore.activeGroup

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
            description: 'Помните, срок действия токена 1 месяц.',
            duration: 4
        })
    }

    return (
        <div>
            <Spin spinning={!tokensStore.loaded} size='large'>
                <AddMemberImport 
                    currentBlock={currentBlock}
                    setCurrentBlock={setCurrentBlock}
                    members={members}
                />

                <AddMemderTokens 
                    currentBlock={currentBlock}
                    setCurrentBlock={setCurrentBlock}
                    admin={rolesStore.admin}
                    tokensCount={tokensStore.tokensCount}
                    loading={loading}
                    tokensLoaded={tokensStore.loaded}
                    rolesData={rolesStore.data}
                    onTokenAddHandler={onTokenAddHandler}
                    data={tokensStore.data}
                    setLoading={setLoading}
                    setModal={setModal}
                    setModalData={setModalData}
                    isAbleToAdd={tokensStore.data.length < 10}
                />
            </Spin>

            <NotificationModal 
                visible={modal}
                setVisible={setModal}
                title={modalData.title}
                content={modalData.content}
            />
        </div>
    )
})