import { action, makeAutoObservable } from 'mobx'

// services
import { StudySpaceService } from 'services/StudySpaceService'
import { TokensService } from 'services/TokensService'
import { UsersService } from 'services/UsersService'

const service = new StudySpaceService()
const tokensService = new TokensService()
const usersService = new UsersService()

export class Teachers {
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
            const res = await service.getTeachers(page)
            const tokensRes = await service.getTeachersTokens()

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
            const res = await service.getTeachers(page)

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
            const res = await tokensService.generateTeacher()

            this.tokens.push(res.data)
        }   
        catch(err) {
            console.log(err)
        }

        this.loaded = true
    }

    @action
    async search(value: string) {
        try {   
            const res = await usersService.search({ q: value, teacher: 1 })

            console.log(res.data)

            return res.data.result
        }
        catch(err) {
            console.log(err)
        }
    }
}

export const TeachersStore = new Teachers()