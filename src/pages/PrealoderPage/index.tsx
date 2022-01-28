import React from 'react'

// components
import { Preloader } from 'components/Preloader'

export const PreloaderPage = () => (
    <div className='uk-position-fixed uk-position-cover uk-flex uk-flex-center uk-flex-middle'>
        <Preloader />
    </div>
)