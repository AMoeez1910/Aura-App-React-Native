import { View, ScrollView, Image, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/formField'
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router'
import { getUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Signin = () => {
  const {setIsLoggedIn,setUser} = useGlobalContext()
  const [form,setForm] = useState({
    email: '',
    password: ''
  })
  const [loading,setLoading] = useState(false)
  const handleSubmit = async () => {
    if(!form.email || !form.password) return Alert.alert('Error','Please fill in all fields')
    try {
      setLoading(true)
      await signIn(form.email,form.password)
      const result = await getUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home')
    } catch (error) {
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
          <Image source={images.logo} 
          className='w-32 h-32' 
          resizeMode='contain'/>
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Sign in
          </Text>
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
            title='Sign in'
            handlePress={handleSubmit}
            containerStyles='w-full mt-6'
            isLoading={loading}
          />
          <View>
            <Text className='text-white text-center mt-4 font-pmedium'>
              Don't have an account? 
              <Link href='/sign-up' className='text-secondary-200'> Sign up</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin