import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

// styles
import './InfoBlock.scss'

interface InfoBlockProps {
    title: string | React.ReactNode
    width?: string | number
    children: React.ReactNode
    bodyStyle?: React.CSSProperties
    style?: React.CSSProperties
    titleStyle?: React.CSSProperties
    withHeader?: boolean
    onClick?: () => void
    hasArrowIcon?: boolean
    isSelected?: boolean
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
    title,
    width = '100%',
    children,
    bodyStyle = {},
    style = {},
    titleStyle = {},
    onClick = () => null,
    withHeader = false,
    isSelected = false,
    hasArrowIcon = false
}) => {
    return (
        <div 
            className={`info-block ${withHeader ? 'with-header' : ''}`} 
            style={{ 
                width, 
                height: (hasArrowIcon) ? (
                    isSelected ? (
                        'auto'
                    )
                    : (
                        68
                    )
                ) : (
                    'auto'
                )
                ,
                ...style 
            }}
        >
            {
                title && (
                    <div 
                        className={`info-block__title ${hasArrowIcon ? 'uk-flex uk-flex-between' : ''}`}
                        style={{ ...titleStyle }}
                        onClick={onClick}
                    >
                        <span>
                            { title }
                        </span>

                        {
                            hasArrowIcon && (
                                <div 
                                    className='info-block__title__icon uk-flex uk-flex-center uk-flex-middle'
                                    style={{ transform: isSelected ? 'rotate(180deg)' : '' }}
                                >
                                    <MdKeyboardArrowDown 
                                        size={28} 
                                    />
                                </div>
                            )
                        }
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