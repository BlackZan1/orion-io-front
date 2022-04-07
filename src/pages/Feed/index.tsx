import React, { useEffect, useState } from 'react'
import { 
    Empty, 
    Spin, 
    Tabs, 
    Tag 
} from 'antd'
import moment from 'moment'
import { observer } from 'mobx-react'

// components
import { InfoBlock } from 'components/InfoBlock'
import { ScheduleOneDay } from 'components/ScheduleOneDay'
import { NewsItem } from 'components/NewsItem'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// utils
import { fullWeekDays } from 'utils/dates'
import { randEmoji } from 'utils/emojies'

// stores
import { AuthStore } from 'store/auth'
import { ScheduleStore } from 'store/schedule'
import { StudySpaceStore } from 'store/studySpace'
import { NewsStore } from 'store/news'

// styles
import './Feed.scss'

const emoji = randEmoji()

const { TabPane } = Tabs

export const FeedContainer: React.FC = observer(() => {
    const [studyStore] = useState(StudySpaceStore)
    const [newsStore] = useState(NewsStore)
    const [authStore] = useState(AuthStore)
    const [scheduleStore] = useState(ScheduleStore)
    const { rename } = usePageTitle('')
    const [loaded, setLoaded] = useState<boolean>(false)

    const { schedule: scheduleId, id: groupId } = studyStore.activeGroup

    useEffect(() => {
        if(scheduleStore.data.id !== scheduleId) {
            (async () => {
                setLoaded(false)

                await scheduleStore.getById(scheduleId)

                setLoaded(true)
            })()
        }
        else setLoaded(true)
    }, [scheduleId])

    useEffect(() => {
        if(newsStore.loaded) return

        newsStore.getAll(groupId)
    }, [newsStore.loaded])

    useEffect(() => {
        rename(`${studyStore.activeGroup.name} | Главная страница`)
    }, [])

    const lessons = scheduleStore.loaded ? scheduleStore.lessons : []
    const { user } = authStore

    const weekDayIndex = moment().isoWeekday() - 1
    const lessonsLength = lessons.length && lessons[weekDayIndex].length
    const currentLesson = lessons[weekDayIndex] || []

    const isAbleToAdd = authStore.isSuperUser || authStore.isAdmin

    return (
        <>
            <InfoBlock 
                title={`${emoji} Добро пожаловать, ${user.firstName}!`}
            >
                <p>
                    Сегодня 
                    
                    <Tag 
                        color='success' 
                        style={{ marginLeft: 4, marginRight: 0, fontSize: 14 }}
                    >
                        { moment().format('D MMMM, ') }

                        { fullWeekDays[weekDayIndex] }
                    </Tag>
                </p>

                <p>
                    У вас по расписанию 

                    <Tag 
                        color='processing' 
                        style={{ marginLeft: 4, marginRight: 2, fontSize: 14 }}
                    >
                        { lessonsLength } 
                        
                        {' '}

                        занятия
                    </Tag>

                    {
                        !!lessonsLength && (
                            <>
                                :

                                &nbsp;

                                {
                                    currentLesson.map((lesson: any, index: number) => (
                                        <>
                                            <Tag 
                                                color={lesson.lesson.lesson.color} 
                                                style={{ 
                                                    marginLeft: 4, 
                                                    marginRight: 0, 
                                                    fontSize: 14 
                                                }}
                                            >
                                                { lesson.lesson.name }
                                            </Tag>

                                            {
                                                (index + 1) !== lessonsLength && (
                                                    ', '
                                                )
                                            }
                                        </>
                                    ))
                                }
                            </>
                        )
                    }
                </p>
            </InfoBlock>

            <div className='feed__grid' style={{ marginTop: 20 }}>
                <Spin spinning={!loaded} size='large'>
                    <InfoBlock 
                        title='Расписание на сегодня'
                        withHeader
                    >
                        <ScheduleOneDay 
                            classes={currentLesson}
                            isEditable={false}
                        />
                    </InfoBlock>
                </Spin>

                <Spin spinning={!newsStore.loaded} size='large'>
                    <InfoBlock 
                        title='Недавние новости'
                        withHeader
                        bodyStyle={{ padding: 0 }}
                    >
                        <div 
                            className={`${(!newsStore.loaded || !newsStore.data.length) ? 'uk-flex uk-flex-middle uk-flex-center' : ''}`}
                            style={{ overflowY: 'auto', padding: '20px 20px 10px 20px', height: 550 }}
                        >
                            {
                                newsStore.data.length ? (
                                    newsStore.data.map((i) => (
                                        <NewsItem { ...i } key={i.id} />
                                    ))
                                )
                                : (
                                    <Empty 
                                        description={(
                                            <p>
                                                {
                                                    !newsStore.loaded ? (
                                                        'Загрузка...'
                                                    )
                                                    : (
                                                        <>
                                                            Новостей нет!

                                                            {
                                                                isAbleToAdd && (
                                                                    <>
                                                                        <br />

                                                                        Вы можете добавить 
                                                                        новую новость

                                                                        <br />
                                                                        
                                                                        в разделе новостей
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                            </p>
                                        )}
                                    />
                                )
                            }
                        </div>
                    </InfoBlock>
                </Spin>
            </div>

            <div style={{ position: 'relative' }} className='feed__tabs'>
                <p className='feed__tabs-title'>
                    На сегодня
                </p>
                
                <Tabs
                    defaultActiveKey='1'
                    type='card'
                    size='middle'
                >
                    <TabPane 
                        tab='Расписание' 
                        key='1'
                        style={{ padding: 0 }}
                    >
                        <Spin
                            spinning={!loaded}
                            size='large'
                        >
                            <ScheduleOneDay 
                                classes={currentLesson}
                                isEditable={false}
                            />
                        </Spin>
                    </TabPane>
                    
                    <TabPane 
                        tab='Новости' 
                        key='2'
                        style={{ padding: 0 }}
                    >
                        <Spin
                            spinning={!newsStore.loaded}
                            size='large'
                        >
                            <div 
                                className={`${(!newsStore.loaded || !newsStore.data.length) ? 'uk-flex uk-flex-middle uk-flex-center' : ''}`}
                            >
                                {
                                    newsStore.data.length ? (
                                        newsStore.data.map((i) => (
                                            <NewsItem { ...i } key={i.id} />
                                        ))
                                    )
                                    : (
                                        <Empty 
                                            description={(
                                                <p>
                                                    {
                                                        !newsStore.loaded ? (
                                                            'Загрузка...'
                                                        )
                                                        : (
                                                            <>
                                                                Новостей нет!

                                                                {
                                                                    isAbleToAdd && (
                                                                        <>
                                                                            <br />

                                                                            Вы можете добавить 
                                                                            новую новость

                                                                            <br />
                                                                            
                                                                            в разделе новостей
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </p>
                                            )}
                                        />
                                    )
                                }
                            </div>
                        </Spin>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
})