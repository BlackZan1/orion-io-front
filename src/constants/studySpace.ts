import { GroupData, StudySpaceData } from 'interfaces/studySpace'

export const EmptyStudySpace: StudySpaceData = {
    id: '',
    details: '',
    groups: [],
    image: '',
    imageUrl: '',
    members: [],
    membersCount: 0,
    name: '',
    createdAt: '',
    updatedAt: ''
}

export const EmptyGroup: GroupData = {
    id: '',
    details: '',
    members: [],
    name: '',
    schedule: '',
    studySpace: '',
    createdAt: '',
    updatedAt: ''
}