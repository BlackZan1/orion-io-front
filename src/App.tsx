import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import moment from 'moment'

// utils
import { routes } from 'utils/router'

// pages
import { FeedContainer } from 'pages/Feed'
import { ScheduleContainer } from 'pages/Schedule'
import { MembersContainer } from 'pages/Members'
import { NewsContainer } from 'pages/News'
import { RegisterContainer } from 'pages/Register'
import { UserContainer } from 'pages/User'

// layouts
import { MainLayout } from 'layouts/MainLayout'
import { AuthLayout } from 'layouts/AuthLayout'

// styles
import 'styles/styles.less'

// locales
import 'moment/locale/ru'

moment.locale('ru')

export const App = () => {
    return (
        <Switch>
            <Route path={routes.main} exact>
                <MainLayout title='Главная страница' className='feed'>
                    <FeedContainer />
                </MainLayout>
            </Route>

            <Route path={routes.news} exact>
                <MainLayout title='Новости' className='news'>
                    <NewsContainer />
                </MainLayout>
            </Route>

            <Route path={routes.schedule} exact>
                <MainLayout title='Расписание' className='schedule'>
                    <ScheduleContainer />
                </MainLayout>
            </Route>

            <Route path={routes.members} exact>
                <MainLayout title='Участники' className='members'>
                    <MembersContainer />
                </MainLayout>
            </Route>

            <Route path={routes.user} exact>
                <MainLayout withoutUserInfo className='user-page'>
                    <UserContainer />
                </MainLayout>
            </Route>

            <Route path={routes.auth.signin} exact>
                <AuthLayout>
                    <RegisterContainer />
                </AuthLayout>
            </Route>

            <Redirect to={routes.auth.signin} />
        </Switch>
    )
}