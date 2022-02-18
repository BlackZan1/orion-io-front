export interface TokenState {
    token: string
    group: string
    forRole: 'admin' | 'superUser' | 'user'
    studySpace: string
    updatedAt: string
    createdAt: string
}