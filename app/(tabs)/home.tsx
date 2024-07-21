import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants' 
import SearchInput from '../../components/searchInput'
import TrendingVideos from '../../components/trendingVideos'
import EmptyState from '../../components/empytState'
import { useAppwrite } from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import VideoCard from '../../components/videoCard'
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
const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const {data,loading,refresh} = useAppwrite(getAllPosts)
  const {data:trendingPosts} = useAppwrite (getLatestPosts)
  const postsData : VideoDataI[] = data
  const trendingPostsData : VideoDataI[] = trendingPosts
  const onRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data ={postsData}
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
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'>
                    Welcome Back
                  </Text>
                  <Text className='text-2xl font-psemibold text-white'>
                    Moeez
                  </Text>
                </View>
                <View className='mt-1.5'>
                    <Image
                    source={images.logoSmall}
                    className='w-9 h-10'
                    resizeMode='contain'
                    />
                </View>
              </View>
              <SearchInput
              />
              <View className='w-full flex-1 pt-4 pb-4 '>
                <Text className='text-white text-base font-pregular mb-3'>
                  Latest Videos
                </Text>
                <TrendingVideos 
                videos={trendingPostsData}
                />

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

export default Home