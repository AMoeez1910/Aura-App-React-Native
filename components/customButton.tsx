import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
  title: string,
  handlePress: () => void,
  containerStyles?: string,
  textStyles?: string,
  isLoading?: boolean
}

const CustomButton = ({title,handlePress,containerStyles,textStyles,isLoading}:
CustomButtonProps
) => {
  return (
        <TouchableOpacity 
        onPress={handlePress} 
        activeOpacity={0.8}
        className={`rounded-xl min-h-[62px]
        justify-center items-center bg-secondary ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
        >
          <Text 
          className={`text-primary font-psemibold ${textStyles}`}

          >{title}</Text>
        </TouchableOpacity>
  )
}

export default CustomButton