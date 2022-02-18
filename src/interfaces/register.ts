export interface RegisterState {
    birthDay: string | null
    email: string
    firstName: string
    lastName: string
    middleName: string
    photo: File | null
    phone: string
    password: string
    token?: string
}