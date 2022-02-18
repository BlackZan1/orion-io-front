import { UserData } from './users'

export interface NewsData {
    id: string
    title: string
    details: string
    short: string
    group: string
    createAt: string
    image: File
    imageUrl?: string
    author: UserData
}