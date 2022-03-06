import { action, makeAutoObservable } from 'mobx'

// services
import { StudySpaceService } from 'services/StudySpaceService'

const service = new StudySpaceService()

export class Auditories {
    data: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getAll() {
        try {   
            const res = await service.getAuditories()

            this.data = res.data.result
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async search(value: string) {
        try {   
            const res = await service.getAuditories(value)

            this.data = res.data.result
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async create(data: any) {
        try {   
            const res = await service.createAuditory(data)

            this.data.push(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async update(id: string, data: any) {
        try {   
            const res = await service.updateAuditory(id, data)

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
            const res = await service.deleteAuditory(id)

            if(res.data.success) {
                this.data = [ ...this.data ].filter((i) => i.id !== id)
            }
        }
        catch(err) {
            console.log(err)
        }
    }
}

export const AuditoriesStore = new Auditories()