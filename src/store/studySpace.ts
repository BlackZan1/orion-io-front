import { EmptyGroup, EmptyStudySpace } from 'constants/studySpace'
import { GroupData, StudySpaceData } from 'interfaces/studySpace'
import { action, computed, makeAutoObservable } from 'mobx'

// services
import { StudySpaceService } from 'services/StudySpaceService'

const service = new StudySpaceService()

interface StudySpaceStoreState {
    data: StudySpaceData
    activeGroup: GroupData
    activeGroupId: string
}

class StudySpace implements StudySpaceStoreState {
    data = EmptyStudySpace
    activeGroupId = ''
    activeGroup = EmptyGroup

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async get() {
        try {
            const res = await service.get()

            this.data = res.data

            if(res.data.groups.length) {
                this.setActiveGroupId(res.data.groups[0].id)
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    setActiveGroupId(id: string) {
        this.activeGroupId = id
    }

    @action
    setActiveGroup(data: GroupData) {
        this.activeGroup = data
    }
}

export const StudySpaceStore = new StudySpace()