import { View, ScrollView, Image, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/formField'
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const SignUp = () => {

  const {setIsLoggedIn,setUser} = useGlobalContext()
  const [form,setForm] = useState({
    username:'',
    email: '',
    password: ''
  })
  const [loading,setLoading] = useState(false)
  
  const handleSubmit = async () => {
    if(!form.email || !form.password || !form.username) return Alert.alert('Error','Please fill in all fields')
    try {
      setLoading(true)
      const result = await createUser(form.email,form.password,form.username)
      setUser(result)
      setIsLoggedIn(true)
      
      router.replace('/home')
    } catch (error) {
      console.error(error)
      Alert.alert('Error',error.message)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-4'>
          <Image 
            source={images.logo} 
            className='w-32 h-32' 
            resizeMode='contain'/>
          <Text className='text-2xl text-white text-semibold mt-6 font-psemibold'>
            Sign Up
          </Text>
          <FormField 
            title='Username'
            value={form.username}
            handleChange={(value) => setForm({...form,username: value})}
            placeholder='Enter your Username'
            otherStyles='mt-6'
          />
          <FormField 
            title='Email'
            value={form.email}
            handleChange={(value) => setForm({...form,email: value})}
            placeholder='Enter your email address'
            otherStyles='mt-6'
            keyBoardType='email-address'
          />
          <FormField 
            title='Password'
            value={form.password}
            handleChange={(value) => setForm({...form,password: value})}
            placeholder='Enter your password'
            otherStyles='mt-6'
          />
          <CustomButton
            title='Sign up'
            handlePress={handleSubmit}
            containerStyles='w-full mt-6'
          />
          <View>
            <Text className='text-white text-center mt-4 font-pmedium'>
              Already have an account? 
              <Link 
              href='/sign-in' 
              className='text-secondary-200'
              > Sign in</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp