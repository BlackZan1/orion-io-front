import { action, makeAutoObservable } from 'mobx'

// constants
import { EmptyUserData } from 'constants/users'

// interfaces
import { UserData } from 'interfaces/users'

// services
import { UsersService } from 'services/UsersService'

const service = new UsersService()

export class User {
    data: UserData = EmptyUserData
    loaded = false
    hasError = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getById(id: string) {
        this.loaded = false
        this.hasError = false

        try {
            const res = await service.getById(id)

            this.data = res.data
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }
}

export const UserStore = new User()