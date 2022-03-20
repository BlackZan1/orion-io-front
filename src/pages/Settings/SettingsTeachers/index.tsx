import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { notification } from 'antd'

// stores
import { TeachersStore } from 'store/teachers'

// components
import { SettingsTabs } from '../SettingsTabs'

export const SettingsTeachers: React.FC = observer(() => {
    const [teachersStore] = useState(TeachersStore)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        teachersStore.getAll(page)
    }, [])

    const changePage = (newPage: number) => {
        setPage(newPage)

        teachersStore.changePage(newPage)
    }

    const createToken = async () => {
        if(teachersStore.tokens.length >= 10) return

        await teachersStore.createToken()

        notification.success({
            message: 'Токен сгенерировался!',
            description: 'Помните, срок действия токена 1 месяц.',
            duration: 4
        })
    }

    return (
        <SettingsTabs 
            loaded={teachersStore.loaded} 
            data={teachersStore.data}
            page={page}
            setPage={changePage}
            allCount={teachersStore.allCount}
            tokens={teachersStore.tokens}
            addDisabled={teachersStore.tokens.length >= 10}
            onAdd={createToken}
        />
    )
})