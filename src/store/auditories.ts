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
}

export const AuditoriesStore = new Auditories()