import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/ru_RU'

// components
import { AppRoutes } from 'routes'

// stores
import { AuthStore } from 'store/auth'
import { RolesStore } from 'store/roles'
import { AuditoriesStore } from 'store/auditories'
import { LessonsStore } from 'store/lessons'

// hooks
import { useLocaleStorage } from 'hooks/localStorage.hook'

// styles
import 'styles/styles.less'

// locales
import 'moment/locale/ru'
import { TeachersStore } from 'store/teachers'

moment.locale('ru')

export const App = observer(() => {
    const [authStore] = useState(AuthStore)
    const [rolesStore] = useState(RolesStore)
    const [auditoriesStore] = useState(AuditoriesStore)
    const [lessonsStore] = useState(LessonsStore)
    const [teachersStore] = useState(TeachersStore)

    const { value: tokenValue } = useLocaleStorage('orion_t')

    useEffect(() => {
        (async () => {
            await rolesStore.getAll()   
            
            if(!!tokenValue) {
                await authStore.me()
                await auditoriesStore.getAll()
                await lessonsStore.getAll()
                await teachersStore.getAll()
            }
            else authStore.auth = false
        })()
    }, [tokenValue, authStore.token])

    return (
        <ConfigProvider locale={locale}>
            <AppRoutes />
        </ConfigProvider>
    )
})