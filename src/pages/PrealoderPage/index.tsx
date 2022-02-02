import React, { useEffect } from 'react'

// hooks
import { usePageTitle } from 'hooks/pageTitle.hook'

// components
import { Preloader } from 'components/Preloader'

export const PreloaderPage = () => {
    const { rename } = usePageTitle('IrionIO | ')

    useEffect(() => {
        rename('Загружаем...')
    }, [])

    return (
        <div className='uk-position-fixed uk-position-cover uk-flex uk-flex-center uk-flex-middle'>
            <Preloader />
        </div>
    )
}