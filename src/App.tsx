import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { observer } from 'mobx-react'

// components
import { AppRoutes } from 'routes'

// stores
import { AuthStore } from 'store/auth'

// hooks
import { useLocaleStorage } from 'hooks/localStorage.hook'

// styles
import 'styles/styles.less'

// locales
import 'moment/locale/ru'

moment.locale('ru')

export const App = observer(() => {
    const [authStore] = useState(AuthStore)
    const { value: tokenValue } = useLocaleStorage('orion_t')

    useEffect(() => {
        if(!!tokenValue) authStore.me()
        else authStore.auth = false
    }, [tokenValue, authStore.token])

    return (
        <AppRoutes />
    )
})