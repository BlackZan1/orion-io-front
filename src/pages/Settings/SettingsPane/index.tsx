import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Divider, Input } from 'antd'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

// components
import { AddButton } from 'components/AddButton'

interface SettingsPaneProps {
    data: any[]
}

let timer: any

export const SettingsPane: React.FC<SettingsPaneProps> = ({
    data
}) => {
    const [value, setValue] = useState<string>('')
    const [filteredData, setFilteredData] = useState<any[]>(data)

    const onChangeHandler = (ev: SyntheticEvent<HTMLInputElement>) => {
        const { value: newValue } = ev.currentTarget

        setValue(newValue)
    }

    useEffect(() => {
        return () => {
            setValue('')
            setFilteredData(data)
        }
    }, [])

    useEffect(() => {
        if(!value) {
            setValue('')
            setFilteredData(data)

            return
        }

        if(!timer) clearTimeout(timer)

        timer = setTimeout(() => {
            const newData = [ ...data ].filter((i) => !!i.name.search(new RegExp(value, 'i')))

            setFilteredData(newData)
        }, 400)
    }, [value])

    return (
        <>
            <div className='uk-flex uk-flex-between' style={{ paddingTop: 5 }}>
                <Input 
                    placeholder='Введите для поиска' 
                    style={{ width: 'calc(100% - 135px)', minHeight: 42 }} 
                    value={value}
                    onChange={onChangeHandler}
                />

                <AddButton title='Создать' />
            </div>

            <Divider style={{ margin: '15px 0' }} />

            <div>
                {
                    filteredData.map((item, i) => (
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
                }
            </div>
        </>
    )
}