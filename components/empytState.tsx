import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './customButton'

const EmptyState = ({title,subtitle}:{
    title: string,
    subtitle?: string
}) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image
        source={images.empty}
        className='w-[260px] h-[215px]'
        resizeMode='contain'
      />
      <Text className='text-2xl font-psemibold text-white'>
            {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100'>
            {subtitle}
      </Text>
      <CustomButton
        title='Create Videos'
        handlePress={()=>{}}
        containerStyles='w-full mt-4'
        textStyles='text-base'
        /> 
    </View>
  )
}

export default EmptyState