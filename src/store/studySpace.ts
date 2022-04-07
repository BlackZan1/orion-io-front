import { EmptyGroup, EmptyStudySpace } from 'constants/studySpace'
import { GroupData, StudySpaceData } from 'interfaces/studySpace'
import { action, computed, makeAutoObservable } from 'mobx'

// services
import { StudySpaceService } from 'services/StudySpaceService'
import { GroupService } from 'services/GroupService'

// stores
import { MembersStore } from './members'
import { NewsStore } from './news'
import { TokensStore } from './tokens'
import { ScheduleStore } from './schedule'
import { GroupLessonsStore } from './groupLessons'
import { ImportUserData } from 'interfaces/groups'

const service = new StudySpaceService()
const groupService = new GroupService()

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
    setData(data: StudySpaceData) {
        this.data = data

        if(this.data.groups.length) {
            this.setActiveGroupId(this.data.groups[0].id)
        }
    }

    @action
    setActiveGroupId(id: string) {
        this.activeGroupId = id
    }

    @action
    setActiveGroup(data: GroupData) {
        this.activeGroup = data

        const stores = [
            MembersStore,
            NewsStore,
            TokensStore,
            ScheduleStore,
            GroupLessonsStore
        ]

        stores.forEach((store) => store.reset())
    }

    @action
    async createGroup(data: any) {
        try {
            const res = await groupService.create(data)

            this.data.groups.push(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async renameGroup(groupId: string, name: string) {
        try {
            const res = await groupService.update(groupId, name)

            this.data.groups = [ ...this.data.groups ].map((group) => {
                if(group.id === groupId) return { ...group, name }

                return group
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async deleteGroup(groupId: string) {
        try {
            const res = await groupService.delete(groupId)

            console.log(res.data)

            this.data.groups = [ ...this.data.groups ].filter((i) => i.id !== groupId)
            this.activeGroup = this.data.groups[0]
            this.activeGroupId = this.data.groups[0].id
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async importUser(groupId: string, data: ImportUserData) {
        try {
            await groupService.importUser(groupId, data)
            await MembersStore.getAll(groupId, 1)
        }
        catch(err) {
            console.log(err)
        }
    }

    @computed
    get isEmpty() {
        return this.data.groups.length <= 0
    }
}

export const StudySpaceStore = new StudySpace()