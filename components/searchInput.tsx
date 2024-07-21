import React, { useState } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}:{initialQuery?:string}) => {
    const pathname = usePathname()
    const [query,setQuery] = useState(initialQuery || '')

    return (
        <View className='border-2 border-black-100 w-full h-16 px-4  bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={query}
                onChangeText={(value) => {setQuery(value)}}
                placeholder={'Search for videos'}
                placeholderTextColor='#CDCDE0'
            />
            <TouchableOpacity onPress={()=>{
                if(!query)
                    return Alert.alert('Error','Please enter a search query')
                if(pathname.startsWith('/search'))
                    router.setParams({query})
                else router.push(`/search/${query}`)
            }}>
                <Image
                    source={icons.search}
                    resizeMode='contain'
                    className='w-6 h-6'
                />
            </TouchableOpacity>
        </View>
  )
}

export default SearchInput