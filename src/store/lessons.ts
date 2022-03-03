import { action, makeAutoObservable } from 'mobx'

// services
import { StudySpaceService } from 'services/StudySpaceService'

const service = new StudySpaceService()

export class Lessons {
    data: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getAll() {
        try {   
            const res = await service.getLessons()

            this.data = res.data.result
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async search(value: string) {
        try {   
            const res = await service.getLessons(value)

            this.data = res.data.result
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async create(data: any) {
        try {   
            const res = await service.createLesson(data)

            this.data.push(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }
}

export const LessonsStore = new Lessons()