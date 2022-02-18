import { action, makeAutoObservable } from 'mobx'

// interfaces
import { NewsData } from 'interfaces/news'
import { MainParams } from 'interfaces/params'

// services
import { NewsService } from 'services/NewsService'
import { GroupService } from 'services/GroupService'
import { AxiosResponse } from 'axios'

const service = new NewsService()
const groupService = new GroupService()

export class News {
    data: NewsData[] = []
    loaded = false
    params: MainParams = { page: 1, limit: 10 }

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getAll(groupId: string) {
        this.loaded = false

        try {
            const page = this.params.page || 1

            const res = await groupService.getNews(groupId, page)
            
            this.data = res.data.result
            this.loaded = true
        }
        catch(err) {
            console.log(err)
            this.loaded = true
        }
    }

    @action
    async create(data: NewsData) {
        try {
            let res: AxiosResponse<any>

            if(data.image) {
                const keys = Object.keys(data)
                const values = Object.values(data)
                const form = new FormData()

                keys.forEach((key, index) => {
                    if(values[index])form.append(key, values[index])
                })

                res = await service.create(form)
            }
            else res = await service.create(data)

            console.log(res.data)
            
            this.data.unshift(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    reset() {
        this.data = []
        this.loaded = false
        this.params = { page: 1, limit: 10 }
    }
}

export const NewsStore = new News()