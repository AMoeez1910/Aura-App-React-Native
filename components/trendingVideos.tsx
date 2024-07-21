import { SafeAreaView, FlatList, Image, TouchableOpacity, TextStyle, ViewStyle, ImageStyle, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { VideoDataI } from '../app/(tabs)/home'
import * as Animatable from	'react-native-animatable'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

Animatable.initializeRegistryWithDefinitions({
    customZoomIn: {
        0: {
            transform: [{ scale: 0.9 }],
        },
        1: {
            transform: [{ scale: 1 }],
        },
    },
    customZoomOut: {
        0: {
            transform: [{ scale: 1 }],
        },
        1: {
            transform: [{ scale: 0.9 }],
        },
    },
});
const TrendingItem = ({video,activeItem}:{video:VideoDataI,activeItem:string}) => {
    const [playing,setPlaying] = useState(false)
    return (
        
    <Animatable.View
        className='mr-2'
        animation={ video.$id === activeItem ? 'customZoomIn' : 'customZoomOut'}
        duration={500}
    >
       {
            playing ?
            (
            <Video
                source={{uri:video.video}}
                className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status:any) => {
                    if(status.didJustFinish){
                        setPlaying(false)
                    }
                }
            }
            />
            ) : (
            <TouchableOpacity onPress={()=>{setPlaying(!playing)}}
            className='relative justify-center items-center'
            activeOpacity={0.8}
            >
                <ImageBackground
                    source={{uri:video.thumbnail}}
                    className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40'
                    resizeMode='cover'
                />
                <Image
                source={icons.play}
                className='w-12 h-12 rounded-full bg-primary absolute'
                resizeMode='contain'
                />
            </TouchableOpacity>
            )
       } 
    </Animatable.View>
    )
}

const TrendingVideos = ({videos}:{videos:VideoDataI[]}) => {
    // scroll view dont support horizontal and vertical view at the same time
    const [activeItem,setActiveItem] = useState<string>(videos[0]?.$id)
    const viewableItemChanged = (viewableItems:any) => {
        if(viewableItems.length>0){
            setActiveItem(viewableItems[0].key)
        }
    }
    return (
    <SafeAreaView className='bg-primary'>
        <FlatList
            data={videos}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => {
                return (
                    <TrendingItem 
                    video={item}
                    activeItem={activeItem}
                    />
                )
            }}
            onViewableItemsChanged={({ viewableItems }) => viewableItemChanged(viewableItems)}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{x: 70, y: 0}}
            horizontal
        />

    </SafeAreaView>
    
  )
}

export default TrendingVideos