import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// layouts
import { AuthLayout } from 'layouts/AuthLayout'
import { MainLayout } from 'layouts/MainLayout'

// pages
import { FeedContainer } from 'pages/Feed'
import { MembersContainer } from 'pages/Members'
import { NewsContainer } from 'pages/News'
import { RegisterContainer } from 'pages/Register'
import { ScheduleContainer } from 'pages/Schedule'
import { UserContainer } from 'pages/User'

// utils
import { routes } from 'utils/router'

type AppRouteLayout = 'main' | 'auth'

interface AppRoute {
    url: string
    layout: AppRouteLayout
    component: React.FC,
    exact: boolean,
    className?: string,
    title?: string,
    withoutUserInfo?: boolean
}

const allRoutes: AppRoute[] = [
    {
        url: routes.main,
        component: FeedContainer,
        layout: 'main',
        exact: true,
        className: 'feed',
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
        url: routes.user,
        component: UserContainer,
        layout: 'main',
        exact: true,
        className: 'user-page',
        withoutUserInfo: true
    },
    {
        url: routes.auth.signin,
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

                    switch(route.layout) {
                        case 'main':
                            const props: any = {}

                            if(route.className) props.className = route.className
                            if(route.title) props.title = route.title
                            if(route.withoutUserInfo) props.withoutUserInfo = route.withoutUserInfo

                            routeInner = (
                                <MainLayout     
                                    key={route.url} 
                                    { ...props }
                                >
                                    <route.component />
                                </MainLayout>
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