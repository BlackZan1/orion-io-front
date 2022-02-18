import { action, computed, makeAutoObservable } from 'mobx'

// interfaces
import { UserData } from 'interfaces/users'

// services
import { GroupService } from 'services/GroupService'

const service = new GroupService()

export class Members {
    data: UserData[] = []
    allCount = 0
    loaded = false
    adminCount = 0
    superUserCount = 0
    userCount = 0

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getAll(groupId: string, page: number) {
        this.loaded = false

        try {
            const res = await service.getUsers(groupId, page)

            this.data = res.data.result
            this.allCount = res.data.allCount
            this.adminCount = res.data.adminCount
            this.superUserCount = res.data.superUserCount
            this.userCount = res.data.userCount
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
        }
    }

    @action
    reset() {
        this.data = []
        this.allCount = 0
        this.loaded = false
        this.adminCount = 0
        this.superUserCount = 0
        this.userCount = 0
    }
}

export const MembersStore = new Members()