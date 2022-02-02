import { action, computed, makeAutoObservable } from 'mobx'

// services
import { ScheduleService } from 'services/ScheduleService'

const service = new ScheduleService()

const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
]

class Schedule {
    data: any = []
    loaded = false

    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    @action
    async getById(id: string) {
        this.loaded = false

        try {
            const res = await service.getById(id)

            console.log(res.data)

            this.data = res.data
            this.loaded = true
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async createEvent(data: any, cb: Function) {
        const { id } = this.data

        try {
            const res = await service.createEvent(id, data)
            const newData = res.data

            switch(data.day) {
                case 1:
                    this.data.monday.push(newData)

                    break
                case 2:
                    this.data.tuesday.push(newData)

                    break
                case 3:
                    this.data.wednesday.push(newData)
    
                    break
                case 4:
                    this.data.thursday.push(newData)

                    break
                case 5:
                    this.data.friday.push(newData)

                    break
                case 6:
                    this.data.saturday.push(newData)

                    break
                case 7:
                    this.data.sunday.push(newData)

                    break
                default:
                    return
            }

            cb()
        }
        catch(err) {
            this.loaded = true

            console.log(err)
        }
    }

    @action
    async updateEvent(eventId: string, data: any) {
        const { id } = this.data

        try {
            const res = await service.updateEvent(id, eventId, data)

            console.log(res.data)

            days.forEach((day) => {
                const eventIndex = this.data[day].findIndex((i: any) => i.id === eventId)

                if(eventIndex !== -1) {
                    this.data[day][eventIndex] = { ...res.data }

                    console.log(this.data[day][eventIndex])
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    @action
    async deleteEvent(eventId: string) {
        const { id } = this.data

        try {
            days.forEach((day) => {
                this.data[day] = this.data[day].filter((i: any) => i.id !== eventId)
            })

            const res = await service.deleteEvent(id, eventId)

            console.log(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    @computed
    get lessons(): any[] {
        const all: any[] = []

        if(this.loaded) {
            days.forEach((day, index) => {
                all[index] = this.data[day].map((i: any) => i)
            })
        }

        return all
    }
}

export const ScheduleStore = new Schedule()