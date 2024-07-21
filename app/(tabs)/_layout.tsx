import { View, Text, Image } from 'react-native'
import { Tabs,Redirect, router } from "expo-router";
import React, { useEffect } from 'react'
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';

const TabIcon = ({icon,color,name,focused}) => {
    const {loading,isLoggedIn} = useGlobalContext()
    if(!loading && !isLoggedIn) return <Redirect href='/'/>
    return (
        <View className='items-center justify-center gap-2 mt-2'>
            <Image 
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color:color}}>
                {name}
            </Text>
        </View>
    )
}
const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel:false,
            tabBarActiveTintColor:"#FFA001",
            tabBarInactiveTintColor:"#CDCDE0",
            tabBarStyle:{
                backgroundColor:"#161622",
                borderTopWidth:1,
                borderTopColor:"##232533",
                height:70,
            }
        }}
    >
        <Tabs.Screen name='home' options={
            {
                title:"Home",
                headerShown:false,
                tabBarIcon : ({color,focused}) => (
                    <TabIcon 
                        icon={icons.home}
                        color={color}
                        name='Home'
                        focused={focused}
                    />
                )
            }
        }
        />
        <Tabs.Screen name='bookmark' options={
            {
                title:"Bookmark",
                headerShown:false,
                tabBarIcon : ({color,focused}) => (
                    <TabIcon 
                        icon={icons.bookmark}
                        color={color}
                        name='Bookmark'
                        focused={focused}
                    />
                )
            }
        }
        />
        <Tabs.Screen name='create' options={
            {
                title:"Create",
                headerShown:false,
                tabBarIcon : ({color,focused}) => (
                    <TabIcon 
                        icon={icons.plus}
                        color={color}
                        name='Create'
                        focused={focused}
                    />
                )
            }
        }
        />
        <Tabs.Screen name='profile' options={
            {
                title:"Profile",
                headerShown:false,
                tabBarIcon : ({color,focused}) => (
                    <TabIcon 
                        icon={icons.profile}
                        color={color}
                        name='Profile'
                        focused={focused}
                    />
                )
            }
        }
        />
    </Tabs>
  )
}

export default TabsLayout