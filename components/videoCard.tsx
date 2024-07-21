import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { VideoDataI } from '../app/(tabs)/home'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard= ({videos}:{videos:VideoDataI}) => {
    const [playing,setPlaying] = useState(false)
  return (
    <View className='flex-col items-center px-4 mb-14'>
        <View className='flex-row gap-3 items-start'>
            <View className='justify-center items-center flex-row flex-1'>
                <View className='w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center'>
                    <Image
                        source = {{uri:videos.creator.avatar}}
                        className='w-full h-full rounded-lg'
                        resizeMode='cover'
                    />
                </View>
                <View className='justify-center flex-1 ml-3 gap-y-1 mb-2'>
                    <Text className='text-white text-sm font-psemibold' numberOfLines={1}>
                        {videos.title}
                    </Text>
                    <Text className='text-gray-100 text-xs font-pregular' numberOfLines={1}>
                        {videos.creator.username}
                    </Text>
                </View>
            </View>
            <View className='pt-2'>
                <Image 
                source={icons.menu}
                className='w-5 h-5'
                resizeMode='contain'
                />
            </View>
        </View>
        {
            playing ?
            (
                <Video
                source={{uri:videos.video}}
                className='w-full h-60 rounded-xl mt-3'
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status:any) => {
                    if(status.didJustFinish){
                        setPlaying(false)
                    }
                }
            }/>
            ) : (
            <TouchableOpacity onPress={()=>{setPlaying(!playing)}}
            className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
            activeOpacity={0.8}
            >
                <Image
                    source={{uri:videos.thumbnail}}
                    className='w-full h-full rounded-lg mt-3'
                    resizeMode='cover'
                />
                <Image
                source={icons.play}
                className='w-12 h-12 absolute '
                resizeMode='contain'
                />
            </TouchableOpacity>
            )
            }
    </View>
  )
}

export default VideoCard