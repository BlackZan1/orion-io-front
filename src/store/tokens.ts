import { action, computed, makeAutoObservable } from 'mobx'

// utils
import { TokenState } from 'interfaces/tokens'

// services
import { GroupService } from 'services/GroupService'
import { TokensService } from 'services/TokensService'
import { AxiosResponse } from 'axios'

const service = new GroupService()
const tokensService = new TokensService()

class Tokens {
    data: TokenState[] = []
    loaded = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getById(id: string) {
        this.loaded = false

        try {
            const res = await service.getTokens(id)

            this.data = res.data.result
            this.loaded = true
        }
        catch(err) {
            console.log(err)
        }
    }

    @computed
    get isAbleToAdd(): boolean {
        return this.data.length < 10
    }

    @computed
    get tokensCount(): number {
        return this.data.length
    }

    @action
    async check(token: string): Promise<boolean> {
        try {
            const res = await tokensService.check(token)

            return res.data.success
        }
        catch(err) {
            console.log(err)

            return false
        }
    }

    @action
    async generate(groupId: string, type: 'admin' | 'superUser' | 'user') {
        try {
            if(!this.isAbleToAdd) return

            let res: AxiosResponse<any>

            switch(type) {
                case 'admin':
                    res = await tokensService.generateAdmin(groupId)

                    break
                case 'superUser':
                    res = await tokensService.generateSuperUser(groupId)

                    break
                case 'user':
                default:
                    res = await tokensService.generate(groupId)

                    break
            }

            this.data.push(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async delete(token: string) {
        try {
            await tokensService.delete(token)

            this.data = [ ...this.data ].filter((i) => i.token !== token)
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    reset() {
        this.loaded = false
        this.data = []
    }
}

export const TokensStore = new Tokens()