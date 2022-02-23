import React, { useState } from 'react'
import { Tag, Tooltip } from 'antd'
import { observer } from 'mobx-react'
import { AiOutlineDelete, AiOutlineLink } from 'react-icons/ai'

// styles
import './TokenItem.scss'
import { RolesStore } from 'store/roles'

interface TokenItemProps {
    token: string
    forRole: 'admin' | 'superUser' | 'user'
    onDelete: () => void
}

export const TokenItem: React.FC<TokenItemProps> = observer(({
    token,
    forRole,
    onDelete
}) => {
    const [rolesStore] = useState(RolesStore)
    const [tool, setTool] = useState<string>('Нажмите на токен для получения ссылки')

    const copyToClipboard = () => {
        const { location: { origin } } = window

        if('clipboard' in navigator) {
            navigator.clipboard.writeText(`${origin}/register?token=${token}`)

            setTool('Ссылка скопирована!')
        }
        else setTool('Ссылка не скопирована!')
    }

    const currentRole = rolesStore.data.find((i) => i.value === forRole)

    return (
        <div 
            className='token-item uk-flex uk-flex-middle uk-flex-between'
            onMouseLeave={() => setTool('Нажмите на токен для получения ссылки')}
        >
            <Tooltip
                placement='topLeft'
                title={tool}
                overlayInnerStyle={{ 
                    fontSize: 16, 
                    borderRadius: 7, 
                    padding: 10
                }}
            >
                <div 
                    className='token-item__content uk-flex uk-flex-middle'
                    onClick={copyToClipboard}
                >
                    <div 
                        className='uk-flex uk-flex-center uk-flex-middle' 
                        style={{ width: 22, height: 22 }}
                    >
                        <AiOutlineLink size={22} />
                    </div>

                    {
                        currentRole && (
                            <Tag 
                                className='uk-margin-small-left'
                                color={currentRole.color}
                            >
                                { currentRole.name }
                            </Tag>
                        )
                    }

                    <span className='uk-text-small'>
                        { token }
                    </span>
                </div>
            </Tooltip>

            <div 
                className='uk-flex uk-flex-middle uk-flex-center token-item__icon'
                onClick={onDelete}
            >
                <AiOutlineDelete size={22} color='crimson' />
            </div>
        </div>
    )
})