import { action, makeAutoObservable } from 'mobx'
import { MainParams } from 'interfaces/params'

// services
import { StudySpaceService } from 'services/StudySpaceService'

const service = new StudySpaceService()

export class Lessons {
    data: any[] = []
    isMore = false
    params: MainParams = {
        page: 1,
        limit: 10,
        q: ''
    }

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
        this.params.q = value
        this.params.page = 1

        try {   
            const res = await service.getLessons(this.params)

            this.data = res.data.result
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async searchOptional(value: string) {
        try {   
            const res = await service.getLessons({ 
                q: value,
                limit: 10,
                page: 1
            })

            return res.data.result
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async nextPage() {
        this.params.page += 1
        
        try {   
            const res = await service.getLessons(this.params)

            this.data = [ ...this.data, ...res.data.result ]
            this.isMore = res.data.isMore
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

    @action
    async update(id: string, data: any) {
        try {   
            const res = await service.updateLesson(id, data)

            this.data = [ ...this.data ].map((item) => {
                if(item.id === id) return { ...res.data }

                return item
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async delete(id: string) {
        try {   
            const res = await service.deleteLesson(id)

            if(res.data.success) {
                this.data = [ ...this.data ].filter((i) => i.id !== id)
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    reset() {
        this.params = {
            page: 1,
            limit: 10,
            q: ''
        }
        this.getAll()
    }
}

export const LessonsStore = new Lessons()