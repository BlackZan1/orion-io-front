import { action, computed, makeAutoObservable } from 'mobx'

// services
import { RolesService } from 'services/RolesService'

const service = new RolesService()

export class Roles {
    data: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getAll() {
        try {   
            const res = await service.getAll()

            this.data = res.data
        }
        catch(err) {
            console.log(err)
        }
    }

    @computed
    get admin() {
        return this.data.find((i) => i.value === 'admin')
    }

    @computed
    get superUser() {
        return this.data.find((i) => i.value === 'superUser')
    }

    @computed
    get user() {
        return this.data.find((i) => i.value === 'user')
    }
}

export const RolesStore = new Roles()