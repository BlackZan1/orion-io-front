import React, { SyntheticEvent, useEffect, useState } from 'react'
import { 
    Divider, 
    Empty, 
    Input, 
    Popconfirm, 
    Spin 
} from 'antd'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import InfiniteScroll from 'react-infinite-scroll-component'
import { observer } from 'mobx-react'

// components
import { AddButton } from 'components/AddButton'

interface SettingsPaneProps {
    data: any[]
    onSearch: (value: string, cb: Function) => void
    reload: () => void
    onAdd: () => void
    setEditData: (data: any) => void
    onDelete: (id: string) => void
    isMore: boolean
    next: Function
}

export const SettingsPane: React.FC<SettingsPaneProps> = observer(({
    data,
    onSearch,
    reload,
    onAdd,
    setEditData,
    onDelete,
    isMore,
    next
}) => {
    const [value, setValue] = useState<string>('')
    const [timer, setTimer] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const onChangeHandler = (ev: SyntheticEvent<HTMLInputElement>) => {
        const { value: newValue } = ev.currentTarget

        setValue(newValue)
        setLoading(true)

        if(!!timer) clearTimeout(timer)

        setTimer(setTimeout(() => {
            onSearch(newValue, () => setLoading(false))
        }, 750))
    }

    useEffect(() => {
        return () => {
            setValue('')
            reload()
        }
    }, [])

    return (
        <>
            <div className='main-settings__content__mobile-btn'>
                <AddButton 
                    title='Создать'
                    onClick={onAdd}
                />
            </div>

            <div className='uk-flex uk-flex-between' style={{ paddingTop: 5 }}>
                <Input 
                    placeholder='Введите для поиска' 
                    style={{ width: 'calc(100% - 135px)', minHeight: 42 }} 
                    defaultValue={value}
                    onChange={onChangeHandler}
                    className='main-settings__content__mobile-full'
                />

                <div className='main-settings__content__btn'>
                    <AddButton 
                        title='Создать'
                        onClick={onAdd}
                    />
                </div>
            </div>

            <Divider style={{ margin: '15px 0' }} />

            <Spin spinning={loading}>
                <InfiniteScroll
                    dataLength={data.length}
                    hasMore={isMore}
                    next={() => next()}
                    loader={(
                        <div className='uk-flex uk-flex-center'>
                            <Spin />
                        </div>
                    )}
                >
                    {
                        data.length ? (
                            data.map((item, i) => (
                                <div 
                                    className='main-settings__content__item uk-flex uk-flex-middle' 
                                    key={i}
                                >
                                    {
                                        item.color && (
                                            <div 
                                                className='main-settings__content__item__color' 
                                                style={{ backgroundColor: item.color }}
                                            />
                                        )
                                    }

                                    <span style={{ width: item.color ? 'calc(100% - 70px - 32px)' : '' }}>
                                        { item.name }
                                    </span>

                                    <div className='main-settings__content__item__icons uk-flex uk-flex-middle'>
                                        <div 
                                            className='main-settings__content__item__icon'
                                            onClick={() => setEditData(item)}
                                        >
                                            <AiOutlineEdit size={22} />
                                        </div>

                                        <Popconfirm
                                            placement='topRight'
                                            title='Вы действительно хотите удалить?'
                                            okText='Да'
                                            cancelText='Нет'
                                            onConfirm={() => onDelete(item.id)}
                                        >
                                            <div className='main-settings__content__item__icon'>
                                                <AiOutlineDelete size={22} color='crimson' />
                                            </div>
                                        </Popconfirm>
                                    </div>
                                </div>
                            ))
                        )
                        : (
                            <Empty
                                description={(
                                    <p>
                                        Нет данных!
                                    </p>
                                )}
                            />
                        )
                    }
                </InfiniteScroll>
            </Spin>
        </>
    )
})