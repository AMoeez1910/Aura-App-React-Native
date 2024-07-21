import { View, Text, SafeAreaView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '../../lib/useAppwrite';
import { getSearchPosts } from '../../lib/appwrite';
import SearchInput from '../../components/searchInput';
import VideoCard from '../../components/videoCard';
import EmptyState from '../../components/empytState';
import { images } from '../../constants';

const Search = () => {
  const {query} = useLocalSearchParams();
  const {data,loading,refresh} = useAppwrite(() => getSearchPosts(query as string))
  useEffect(()=>{
    refresh()
  },[query])
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data ={data}
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
                    Search Results
                  </Text>
                  <Text className='text-2xl font-psemibold text-white'>
                    {query}
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
                initialQuery={query as string}
              />
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
        />
    </SafeAreaView>
  )
}

export default Search