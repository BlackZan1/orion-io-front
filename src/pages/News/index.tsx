import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Empty, Spin } from 'antd'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// stores
import { NewsStore } from 'store/news'
import { StudySpaceStore } from 'store/studySpace'
import { AuthStore } from 'store/auth'

// components
import { NewsItem } from 'components/NewsItem'
import { AddButton } from 'components/AddButton'
import { AddNewsModal } from 'components/AddNewsModal'

// styles
import './News.scss'
import InfiniteScroll from 'react-infinite-scroll-component'

export const NewsContainer: React.FC = observer(() => {
    const [newsStore] = useState(NewsStore)
    const [authStore] = useState(AuthStore)
    const [studyStore] = useState(StudySpaceStore)
    const { rename } = usePageTitle('')

    const [modal, setModal] = useState<boolean>(false)
    const [editData, setEditData] = useState<any>({})

    const { id: groupId, name: groupName } = studyStore.activeGroup

    useEffect(() => {
        newsStore.getAll(groupId)
    }, [])

    useEffect(() => {
        rename(`${groupName} | Новости`)
    }, [])

    const isAbleToAdd = authStore.isAdmin || authStore.isSuperUser

    return (
        <div className={`news-block ${isAbleToAdd ? '' : 'is-not-admin'}`}>
            {
                isAbleToAdd && (
                    <div className='news-block__btns'>
                        <AddButton 
                            title='Добавить новость'
                            onClick={() => {
                                setEditData({})
                                setModal(true)
                            }}
                        />
                    </div>
                )
            }

            <Spin spinning={!newsStore.loaded} size='large'>
                <div 
                    className={`news-block__list ${!newsStore.data.length ? 'uk-flex uk-flex-center uk-flex-middle' : ''}`}
                >
                    {
                        newsStore.data.length ? (
                            <InfiniteScroll
                                dataLength={newsStore.data.length}
                                hasMore={newsStore.isMore}
                                next={() => newsStore.nextPage(groupId)}
                                loader={(
                                    <div className='uk-flex uk-flex-center'>
                                        <Spin />
                                    </div>
                                )}
                            >
                                {
                                    newsStore.data.map((i) => (
                                        <NewsItem { ...i } key={i.id} />
                                    ))
                                }
                            </InfiniteScroll>
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

                                                                Вы можете добавить новую новость
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

            <AddNewsModal 
                visible={modal}
                setVisible={setModal}
                editData={editData}
            />
        </div>
    )
})