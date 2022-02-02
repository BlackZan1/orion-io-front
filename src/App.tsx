import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'
import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/ru_RU'

// components
import { AppRoutes } from 'routes'

// stores
import { AuthStore } from 'store/auth'
import { StudySpaceStore } from 'store/studySpace'

// hooks
import { useLocaleStorage } from 'hooks/localStorage.hook'

// styles
import 'styles/styles.less'

// locales
import 'moment/locale/ru'

moment.locale('ru')

export const App = observer(() => {
    const [authStore] = useState(AuthStore)
    const [studyStore] = useState(StudySpaceStore)
    const { value: tokenValue } = useLocaleStorage('orion_t')

    useEffect(() => {
        if(!!tokenValue) {
            (async () => {
                await studyStore.get()
                authStore.me()
            })()
        }
        else authStore.auth = false
    }, [tokenValue, authStore.token])

    return (
        <ConfigProvider locale={locale}>
            <AppRoutes />
        </ConfigProvider>
    )
})