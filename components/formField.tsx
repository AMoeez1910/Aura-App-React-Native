import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { icons } from '../constants'

interface FormFieldProps {
  title: string,
  value: string,
  handleChange: (value: string) => void
  placeholder?: string
  keyBoardType?: string
  otherStyles?: string
}

const FormField = ({title,value,handleChange,placeholder,keyBoardType,otherStyles}:FormFieldProps) => {
    const [showPassword,setShowPassword] = useState(false)
    return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className='text-base text-gray-100 font-pmedium'>
            {title}
        </Text>
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
            <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={value}
                onChangeText={handleChange}
                placeholder={placeholder}
                placeholderTextColor='gray'
                secureTextEntry={title === 'Password' && !showPassword}
            />
            {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField