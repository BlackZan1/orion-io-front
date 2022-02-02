export interface StudySpaceData {
    createdAt: string
    details: string
    groups: GroupData[]
    id: string
    image: string
    imageUrl: string
    members: string[]
    membersCount: number
    name: string
    updatedAt: string
}

export interface GroupData {
    createdAt: string
    details: string
    id: string
    members: string[]
    name: string
    schedule: string
    studySpace: string
    updatedAt: string
}