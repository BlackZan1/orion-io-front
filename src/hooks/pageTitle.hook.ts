import { useCallback } from 'react'

export const usePageTitle = (prefix: string) => {
    const rename = useCallback((value: string) => {
        document.title = `${prefix}${value}`
    }, [])

    return {
        rename
    }
}