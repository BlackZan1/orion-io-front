import { action, makeAutoObservable } from 'mobx'
import { AxiosResponse } from 'axios'

// interfaces
import { RegisterState } from 'interfaces/register'

// services
import { RegisterService } from 'services/RegisterService'

// utils
import { EmptyRegisterData } from 'constants/register'

const service = new RegisterService()

class Register {
    data: RegisterState = EmptyRegisterData
    error = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    setData(data: RegisterState) {
        this.data = {
            ...this.data,
            ...data
        }
    }

    @action
    async register(token: string) {
        try {
            let res: AxiosResponse<any>

            if(this.data.photo) {
                const keys = Object.keys(this.data)
                const values = Object.values(this.data)
                const form = new FormData()

                form.append('token', token)

                keys.forEach((key, index) => {
                    if(values[index]) form.append(key, values[index])
                })

                res = await service.register(form)
            }
            else res = await service.register({ ...this.data, token })

            console.log(res.data)
        }
        catch(err) {
            console.log(err)

            this.error = true
        }
    }

    @action
    async checkEmail(email: string) {
        try {
            const res = await service.checkEmail(email)

            return res.data.success
        }
        catch(err) {
            console.log(err)
        }
    }
}

export const RegisterStore = new Register()