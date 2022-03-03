import React, { SyntheticEvent, useEffect, useState } from 'react'
import { 
    Divider, 
    Empty, 
    Input, 
    Spin 
} from 'antd'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

// components
import { AddButton } from 'components/AddButton'

interface SettingsPaneProps {
    data: any[]
    onSearch: (value: string, cb: Function) => void
    reload: () => void
    onAdd: () => void
}

export const SettingsPane: React.FC<SettingsPaneProps> = ({
    data,
    onSearch,
    reload,
    onAdd
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
            <div className='uk-flex uk-flex-between' style={{ paddingTop: 5 }}>
                <Input 
                    placeholder='Введите для поиска' 
                    style={{ width: 'calc(100% - 135px)', minHeight: 42 }} 
                    defaultValue={value}
                    onChange={onChangeHandler}
                />

                <AddButton 
                    title='Создать'
                    onClick={onAdd}
                />
            </div>

            <Divider style={{ margin: '15px 0' }} />

            <Spin spinning={loading}>
                <div>
                    {
                        data.length ? (
                            data.map((item, i) => (
                                <div 
                                    className='main-settings__content__item uk-flex uk-flex-middle' 
                                    key={i}
                                >
                                    <span>
                                        { item.name }
                                    </span>

                                    <div className='main-settings__content__item__icons uk-flex uk-flex-middle'>
                                        <div className='main-settings__content__item__icon'>
                                            <AiOutlineEdit size={22} />
                                        </div>

                                        <div className='main-settings__content__item__icon'>
                                            <AiOutlineDelete size={22} color='crimson' />
                                        </div>
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
                </div>
            </Spin>
        </>
    )
}