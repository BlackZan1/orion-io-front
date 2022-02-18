import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// layouts
import { AuthLayout } from 'layouts/AuthLayout'
import { MainLayout } from 'layouts/MainLayout'
import { UserLayout } from 'layouts/UserLayout'

// pages
import { FeedContainer } from 'pages/Feed'
import { MembersContainer } from 'pages/Members'
import { NewsContainer } from 'pages/News'
import { SignInContainer } from 'pages/SignIn'
import { ScheduleContainer } from 'pages/Schedule'
import { UserContainer } from 'pages/User'
import { AddMemberContainer } from 'pages/AddMember'
import { RegisterContainer } from 'pages/Register'

// utils
import { routes } from 'utils/router'
import { GroupSettingsContainer } from 'pages/GroupSettings'

type AppRouteLayout = 'main' | 'auth' | 'user'

interface AppRoute {
    url: string
    layout: AppRouteLayout
    component: React.FC,
    exact: boolean,
    className?: string,
    title?: string,
    withoutUserInfo?: boolean
    isGroupName?: boolean
}

const allRoutes: AppRoute[] = [
    {
        url: routes.main,
        component: FeedContainer,
        layout: 'main',
        exact: true,
        className: 'feed',
        isGroupName: true,
        title: 'Главная страница'
    },
    {
        url: routes.news,
        component: NewsContainer,
        layout: 'main',
        exact: true,
        className: 'news',
        title: 'Новости'
    },
    {
        url: routes.schedule,
        component: ScheduleContainer,
        layout: 'main',
        exact: true,
        className: 'schedule',
        title: 'Расписание'
    },
    {
        url: routes.members,
        component: MembersContainer,
        layout: 'main',
        exact: true,
        className: 'members',
        title: 'Участники'
    },
    {
        url: routes.addMember,
        component: AddMemberContainer,
        layout: 'main',
        exact: true,
        className: 'add-member',
        title: 'Добавить участника'
    },
    {
        url: routes.groupSettings,
        component: GroupSettingsContainer,
        layout: 'main',
        exact: true,
        className: 'group-settings',
        title: 'Настройки группы'
    },
    {
        url: routes.user,
        component: UserContainer,
        layout: 'user',
        exact: true,
        className: 'user-page',
    },
    {
        url: routes.auth.signin,
        component: SignInContainer,
        layout: 'auth',
        exact: true
    },
    {
        url: routes.register,
        component: RegisterContainer,
        layout: 'auth',
        exact: true
    }
]

export const AppRoutes: React.FC = () => {
    return (
        <Switch>
            {
                allRoutes.map((route) => {
                    let routeInner: React.ReactNode
                    let props: any = {}

                    switch(route.layout) {
                        case 'main':
                            props = {}

                            if(route.className) props.className = route.className
                            if(route.title) props.title = route.title
                            if(route.withoutUserInfo) props.withoutUserInfo = route.withoutUserInfo
                            if(route.isGroupName) props.isGroupName = route.isGroupName

                            routeInner = (
                                <MainLayout     
                                    key={route.url} 
                                    { ...props }
                                >
                                    <route.component />
                                </MainLayout>
                            )

                            break
                        case 'user':
                            props = {}

                            if(route.className) props.className = route.className
                            if(route.title) props.title = route.title
                            if(route.withoutUserInfo) props.withoutUserInfo = route.withoutUserInfo

                            routeInner = (
                                <UserLayout     
                                    key={route.url} 
                                    { ...props }
                                >
                                    <route.component />
                                </UserLayout>
                            )

                            break
                        case 'auth':
                            routeInner = (
                                <AuthLayout key={route.url}>
                                    <route.component />
                                </AuthLayout>
                            )

                            break
                        default:
                            break
                    }

                    return (
                        <Route 
                            path={route.url} 
                            exact={route.exact} 
                            key={route.url}
                        >
                            { routeInner }
                        </Route>
                    )
                })
            }

            <Redirect to={routes.auth.signin} />
        </Switch>
    )
}