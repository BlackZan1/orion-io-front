import { action, makeAutoObservable } from 'mobx'

// services
import { GroupService } from 'services/GroupService'

const service = new GroupService()

class GroupLessons {
    data: any[] = []
    loaded = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getAll(id: string, search?: string) {
        this.loaded = false

        try {
            const res = await service.getLessons(id, search)

            this.data = res.data.result
        }   
        catch(err) {
            console.log(err)
        }

        this.loaded = true
    }

    @action
    async create(id: string, data: any) {
        this.loaded = false

        try {
            const res = await service.createLesson(id, data)

            this.data.push(res.data)
        }   
        catch(err) {
            console.log(err)
        }

        this.loaded = true
    } 

    @action
    reset() {
        this.data = []
        this.loaded = false
    }
}

export const GroupLessonsStore = new GroupLessons()