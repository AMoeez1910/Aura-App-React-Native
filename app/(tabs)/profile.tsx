import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants' 
import EmptyState from '../../components/empytState'
import { useAppwrite } from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts, signOut, userProfile } from '../../lib/appwrite'
import VideoCard from '../../components/videoCard'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
export interface VideoDataI {
  $id: string,
  title: string,
  thumbnail: string,
  video: string,
  prompt: string,
  creator :{
    $id: string,
    avatar: string,
    username: string,
    email: string
  }
  }
const Profile = () => {
  const {user} = useGlobalContext()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const {setUser,setIsLoggedIn} = useGlobalContext()
  const {data,loading,refresh} = useAppwrite(()=> userProfile(user?.$id))
  const userData : VideoDataI[] = data
  const onRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }
  const logout = async () => {
    try {
      await signOut()
      setIsLoggedIn(false)
      setUser(null)
      router.replace('/');
      Alert.alert('Logged Out')
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data ={userData}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => {
          return (
            <VideoCard 
              videos={item}
            />
          )
        }}
        ListHeaderComponent={() => {
          return (
            <View className='my-6 px-4'>
              <View className='justify-end flex-row'>
              <TouchableOpacity activeOpacity={0.5} onPress={logout}>
              <Image
                source={icons.logout}
                className='w-6 h-6'
                resizeMode='contain' 
                />
              </TouchableOpacity>
              </View>
              <View className='justify-center flex-row mb-6'>
                <View className='flex-col items-center gap-3'>
                  <View className='w-[56px] h-[56px] rounded-lg border border-secondary-100 justify-center'>
                      <Image
                          source = {{uri:user.avatar}}
                          className='w-full h-full rounded-lg'
                          resizeMode='cover'
                      />
                  </View>
                  <View className='items-center'>
                    <Text className='text-2xl font-psemibold text-white'>
                      {user.username}
                    </Text>
                    <Text className='text-gray-100 text-sm font-pregular'>
                      {user.email}
                    </Text>
                  </View>
                  <View className='flex-row'>
                    <View className='flex-col items-center mr-8'>
                    <Text className='text-2xl font-psemibold text-white'>
                      {userData.length}
                    </Text>
                    <Text className='text-gray-100 text-sm font-pregular'>
                       Videos
                    </Text>
                    </View>
                    <View className='flex-col items-center'>
                    <Text className='text-2xl font-psemibold text-white'>
                      200
                    </Text>
                    <Text className='text-gray-100 text-sm font-pregular'>
                      Followers
                    </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )
        }
      }
         ListEmptyComponent={() => {
          return (
            <EmptyState 
            title='No Videos Found'
            subtitle='Be the first to upload'
            />   
          )
         }  
        } 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    </SafeAreaView>
  )
}

export default Profile