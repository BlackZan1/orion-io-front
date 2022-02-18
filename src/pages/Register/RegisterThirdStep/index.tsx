import React, { useState } from 'react'
import { Button } from 'antd'
import { useForm } from 'react-hook-form'

// components
import { UploadAvatar } from 'components/UploadAvatar'

interface RegisterThirdStepProps {
    nextStep: () => void
    prevStep: () => void
    changeData: (data: any) => void
}

export const RegisterThirdStep: React.FC<RegisterThirdStepProps> = ({
    nextStep,
    prevStep,
    changeData
}) => {
    const { handleSubmit } = useForm()
    const [file, setFile] = useState<File>()

    const onSubmitHandler = () => {
        console.log(file)
        
        changeData({
            photo: file
        })
        nextStep()
    }

    return (
        <form
            className='uk-flex uk-flex-column uk-flex-between uk-margin-medium-top'
            style={{ minHeight: 'inherit' }}   
            onSubmit={handleSubmit(onSubmitHandler)} 
        >
            <div>
                <div className='uk-margin-small-bottom'>
                    <p>
                        Выберите фото
                    </p>

                    <UploadAvatar 
                        style={{ width: '100%' }}
                        setFile={setFile}
                    />
                </div>
            </div>

            <div className='uk-flex uk-flex-between uk-margin-medium-top'>
                <Button
                    htmlType='button'
                    type='ghost'
                    style={{ height: 42, width: '100%', margin: '0 10px 0 0' }}
                    onClick={prevStep}
                >
                    Назад
                </Button> 

                <Button
                    htmlType='submit'
                    type='ghost'
                    style={{ height: 42, width: '100%', margin: '0 0 0 10px' }}
                >
                    Готово
                </Button> 
            </div>
        </form>
    )
}