export const routes = {
    main: '/:groupId/feed',
    news: '/:groupId/news',
    members: '/:groupId/members',
    schedule: '/:groupId/schedule',
    addMember: '/:groupId/add-member',
    groupSettings: '/:groupId/settings',
    user: '/user/:id',
    register: '/register',
    studySpace: {
        settings: '/study-space/settings',
        main: '/study-space'
    },
    auth: {
        signin: '/signin'
    }
}