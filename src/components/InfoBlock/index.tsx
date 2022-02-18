import React from 'react'

// styles
import './InfoBlock.scss'

interface InfoBlockProps {
    title: string | React.ReactNode
    width?: string | number
    children: React.ReactNode
    bodyStyle?: React.CSSProperties
    style?: React.CSSProperties
    withHeader?: boolean
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
    title,
    width = '100%',
    children,
    bodyStyle = {},
    style = {},
    withHeader = false
}) => {
    return (
        <div 
            className={`info-block ${withHeader ? 'with-header' : ''}`} 
            style={{ width, ...style }}
        >
            {
                title && (
                    <div className='info-block__title'>
                        <span>
                            { title }
                        </span>
                    </div>
                )
            }

            <div 
                className='info-block__content'
                style={{ ...bodyStyle }}
            >
                { children }
            </div>
        </div>
    )
}