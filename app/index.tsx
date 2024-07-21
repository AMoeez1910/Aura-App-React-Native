import React from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants';
import CustomButton from '../components/customButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
export default function Page() {
  const {loading,isLoggedIn} = useGlobalContext()
  if(!loading && isLoggedIn) return <Redirect href='/home'/>
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{
        height: '100%'
      }}>
        <View className='w-full items-center justify-center h-[85vh] px-4'>
          <Image
          source={images.logo}
          className='w-32 h-32'
          resizeMode='contain'
          />

          <Image
          source={images.cards}
          className=' w-full h-64' 
          resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with <Text className='text-secondary-200'>
              Aura
              </Text>
            </Text>
            <Image
              source={images.path}
              resizeMode='contain'
              className='absolute -bottom-9 right-0 w-[65px] h-20'
              />
          </View>
          <Text className='text-white font-pregular text-sm mt-7'>Diogo Costa's 3 Penalty Save Aura Meets 
          </Text>
          <Text className='text-white text-sm'>Mbappe WorldCup Final Aura</Text>
          <CustomButton
          title='Continue With Email'
          handlePress={()=>{router.push('/sign-in')}}
          containerStyles='w-full mt-4'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}