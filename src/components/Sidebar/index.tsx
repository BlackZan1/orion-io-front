import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

// stores
import { StudySpaceStore } from 'store/studySpace'

// assets
import { ReactComponent as LogoSVG } from 'assets/logo.svg'

// components
import { SidebarItem } from './SidebarItem'

// styles
import './Sidebar.scss'

export const Sidebar: React.FC = observer(() => {
    const [studyStore] = useState(StudySpaceStore)

    const { groups } = studyStore.data
    const { activeGroupId } = studyStore

    const setActiveGroupId = (id: string) => studyStore.setActiveGroupId(id)

    return (
        <aside className='main-sidebar'>
            <div className='main-sidebar__logo'>
                <LogoSVG /> 
                
                <span>
                    beta v.1
                </span>
            </div>

            {
                groups && groups.map((group: any) => {
                    const isSimilar = group.id === activeGroupId

                    return (
                        <SidebarItem 
                            key={group.id} 
                            { ...group } 
                            isOpen={isSimilar}
                            setOpen={() => setActiveGroupId(isSimilar ? '' : group.id)}
                        />
                    )
                })
            }
        </aside>
    )
})