import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Models } from 'react-native-appwrite'

export const useAppwrite = (fn : () => Promise<Models.Document[]>) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
            try {
                const res = await fn()
                setData(res)
                setLoading(false)
            } catch (error) {
                Alert.alert('Error',error.message)
            }
            finally {
                setLoading(false)
            }
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const refresh = async () => {
        fetchData()
    }
    return {data,loading,refresh}
}