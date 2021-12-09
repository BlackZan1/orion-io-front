import React from 'react'

// styles
import './InfoBlock.scss'

export const InfoBlock: React.FC<any> = ({
    title,
    width = '100%',
    content,
    bodyStyle = {},
    withHeader = false
}) => {
    return (
        <div className={`info-block ${withHeader ? 'with-header' : ''}`} style={{ width }}>
            <div className='info-block__title'>
                <span>
                    { title }
                </span>
            </div>

            <div 
                className='info-block__content'
                style={{ ...bodyStyle }}
            >
                { content }
            </div>
        </div>
    )
}