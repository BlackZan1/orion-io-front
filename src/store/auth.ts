import { action, computed, makeAutoObservable } from 'mobx'

// utils
import { LoginData } from 'interfaces/auth'
import { UserData } from 'interfaces/users'
import { EmptyUserData } from 'constants/users'

// services
import { AuthService } from 'services/AuthService'
import { StudySpaceStore } from './studySpace'

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
    async login(data: LoginData, cb?: Function) {
        this.loaded = false

        try {
            const res = await service.login(data)
            const {
                accessToken,
                refreshToken
            } = res.data

            localStorage.setItem('orion_t', accessToken)
            localStorage.setItem('orion_r-t', refreshToken)

            this.token = accessToken

            if(cb) cb()
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

            StudySpaceStore.setData(res.data.studySpace)

            this.auth = true
            this.user = res.data.user
        }
        catch(err) {
            console.log(err)
            
            this.auth = false
        }
    }

    @action
    async refresh() {
        try {
            const token: string = localStorage.getItem('orion_r-t') || ''

            const res = await service.refresh(token)

            console.log(res.data)

            const {
                accessToken,
                refreshToken    
            } = res.data

            localStorage.setItem('orion_t', accessToken)
            localStorage.setItem('orion_r-t', refreshToken)
        }
        catch(err) {
            console.log(err)

            this.auth = false
        }
    }

    @action
    logout() {
        this.auth = false
        this.user = EmptyUserData
        this.token = ''
        this.loaded = true

        localStorage.removeItem('orion_t')
        localStorage.removeItem('orion_r-t')
    }

    @computed
    get isAdmin(): boolean {
        return this.user.role.value === 'admin'
    }

    @computed
    get isSuperUser(): boolean {
        return this.user.role.value === 'superUser'
    }
}

export const AuthStore = new Auth()