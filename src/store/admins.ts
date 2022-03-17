import { action, makeAutoObservable } from 'mobx'

// services
import { StudySpaceService } from 'services/StudySpaceService'
import { TokensService } from 'services/TokensService'

const service = new StudySpaceService()
const tokensService = new TokensService()

export class Admins {
    data: any[] = []
    tokens: any[] = []
    allCount = 0
    loaded = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getAll(page?: number) {
        this.loaded = false

        try {   
            const res = await service.getAdmins(page)
            const tokensRes = await service.getAdminsTokens()

            this.data = res.data.result
            this.tokens = tokensRes.data.result
            this.allCount = res.data.allCount
        }
        catch(err) {
            console.log(err)
        }

        this.loaded = true
    }

    @action
    async changePage(page: number) {
        this.loaded = false

        try {   
            const res = await service.getAdmins(page)

            this.data = res.data.result
        }
        catch(err) {
            console.log(err)
        }

        this.loaded = true
    }

    @action
    async createToken() {
        this.loaded = false

        try {
            const res = await tokensService.generateAdmin()

            this.tokens.push(res.data)
        }   
        catch(err) {
            console.log(err)
        }

        this.loaded = true
    }

    // @action
    // async search(value: string) {
    //     try {   
    //         const res = await service.getAuditories(value)

    //         this.data = res.data.result
    //     }
    //     catch(err) {
    //         console.log(err)
    //     }
    // }
}

export const AdminsStore = new Admins()