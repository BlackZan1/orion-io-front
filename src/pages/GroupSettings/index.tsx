import React, { useEffect, useState } from 'react'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { StudySpaceStore } from 'store/studySpace'

export const GroupSettingsContainer: React.FC = () => {
    const [studyStore] = useState(StudySpaceStore)
    const { rename } = usePageTitle('')

    useEffect(() => {
        rename(`${studyStore.activeGroup.name} | Настройки`)
    }, [])

    return (
        <div>
            <h2>Settings</h2>
        </div>
    )
}