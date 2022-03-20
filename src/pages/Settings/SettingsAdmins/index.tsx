import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { notification } from 'antd'

// stores
import { AdminsStore } from 'store/admins'

// components
import { SettingsTabs } from '../SettingsTabs'

export const SettingsAdmins: React.FC = observer(() => {
    const [adminsStore] = useState(AdminsStore)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        adminsStore.getAll(page)
    }, [])

    const changePage = (newPage: number) => {
        setPage(newPage)

        adminsStore.changePage(newPage)
    }

    const createToken = async () => {
        if(adminsStore.tokens.length >= 10) return

        await adminsStore.createToken()

        notification.success({
            message: 'Токен сгенерировался!',
            description: 'Помните, срок действия токена 1 месяц.',
            duration: 4
        })
    }

    return (
        <SettingsTabs 
            loaded={adminsStore.loaded} 
            data={adminsStore.data}
            page={page}
            setPage={changePage}
            allCount={adminsStore.allCount}
            tokens={adminsStore.tokens}
            addDisabled={adminsStore.tokens.length >= 10}
            onAdd={createToken}
        />
    )
})