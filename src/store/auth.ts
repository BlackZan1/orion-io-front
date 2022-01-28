import { action, makeAutoObservable } from 'mobx'

// utils
import { LoginData } from 'interfaces/auth'
import { UserData } from 'interfaces/users'
import { EmptyUserData } from 'constants/users'

// services
import { AuthService } from 'services/AuthService'

const service = new AuthService()

interface AuthStoreState {
    errors: {
        login: boolean
    }
    loaded: boolean
    auth: boolean | null
    token: string
    user: UserData
}

export class Auth implements AuthStoreState {
    errors = { 
        login: false 
    }
    loaded = true
    auth: boolean | null = null
    token = ''
    user = EmptyUserData

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async login(data: LoginData, cb: Function) {
        this.loaded = false

        try {
            const res = await service.login(data)
            const {
                accessToken,
                refreshToken
            } = res.data

            localStorage.setItem('orion_t', accessToken)
            localStorage.setItem('orion_r-t', refreshToken)

            this.loaded = true
            this.token = accessToken

            cb()
        }
        catch(err) {
            console.log(err)
            
            this.loaded = true
            this.errors.login = true
        }
    }

    @action
    async me() {
        try {
            const res = await service.me()

            console.log(res.data)
            
            this.auth = true
            this.user = res.data
        }
        catch(err) {
            console.log(err)
            
            this.auth = false
        }
    }
}

export const AuthStore = new Auth()