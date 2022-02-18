import React, { useState } from 'react'
import { message, Spin, Upload } from 'antd'
import { AiOutlineSmile } from 'react-icons/ai'

interface UploadAvatarProps {
    style?: React.CSSProperties
    setFile: (file: any) => void
    title?: string
    icon?: React.ReactNode
}

function getBase64(img: any, callback: Function) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}
  
function beforeUpload(file: File) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJpgOrPng) {
        message.error('Файл должен быть в форматtе .jpeg или .png!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isLt2M) {
        message.error('Файл должен быть меньше 2 МБ!');
    }

    return isJpgOrPng && isLt2M
}

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
    style = {},
    setFile,
    title = 'Ваше фото, улыбнитесь',
    icon
}) => {
    const [imgUrl, setImgUrl] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (info: any) => {
        if(info.file.originFileObj) {
            getBase64(
                info.file.originFileObj, 
                (imageUrl: any) => {
                    setImgUrl(imageUrl)
                    setLoading(false)
                }
            )

            setFile(info.file.originFileObj)
        }
    }

    return (
        <Spin spinning={loading} size='large'>
            <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                style={style}
                accept='.jpg, .png, .jpeg'
            >
                {
                    imgUrl ? (
                        <img 
                            src={imgUrl} 
                            alt='avatar' 
                            style={{ width: '100%' }} 
                        />
                    ) 
                    : (
                        <div>
                            {
                                icon || (
                                    <AiOutlineSmile 
                                        size={92} 
                                        color='var(--aqua-color)' 
                                    />
                                )
                            }
                            
                            <div className='uk-margin-top'>
                                { title }
                            </div>
                        </div>
                    )
                }
            </Upload>
        </Spin>
    )
}