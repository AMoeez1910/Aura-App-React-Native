import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/formField'
import { icons } from '../../constants'
import { ResizeMode, Video } from 'expo-av'
import CustomButton from '../../components/customButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createVideo } from '../../lib/appwrite'
export interface formDataI {
  title: string,
  video: ImagePicker.ImagePickerAsset,
  thumbnail: ImagePicker.ImagePickerAsset
  prompt : string
}

const Create = () => {
  const {user} = useGlobalContext()
  const [form,setForm] = useState<formDataI>()
  const [uploading,setUploading] = useState<boolean>(false)
  
  const handleSubmit = async () => {
    if(!form?.title || !form?.video || !form?.thumbnail || !form?.prompt) {
      Alert.alert('Please fill all fields')
      return
    }
    try {
      setUploading(true)
      await createVideo(form,user?.$id)
      Alert.alert('Success','Video uploaded successfully')
      router.push('home')
    } catch (error) {
      Alert.alert('Error',error?.message)
      throw new Error(error)
    }
    finally {
      setUploading(false)
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
    }
  }

  const openPicker = async (selectedType: 'image' | 'video') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectedType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const pickedFile = result.assets[0];
      const fileName = pickedFile.fileName || pickedFile.uri.split('/').pop();
  
      if (selectedType === 'image') {
        setForm({
          ...form,
          thumbnail: { ...pickedFile, fileName },
        });
      }
  
      if (selectedType === 'video') {
        setForm({
          ...form,
          video: { ...pickedFile, fileName },
        });
      }
    } else {
      Alert.alert("Cancelled", "You cancelled the image/video picker.");
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-3'>
        <Text className='text-2xl font-psemibold text-white mb-12'>
          Upload Video
        </Text>
          <FormField
            title= 'Video Title'
            value={form?.title}
            placeholder='Give your video a catchy name'
            handleChange={(value) => setForm({...form,title: value})}
            otherStyles='mb-3'
          />
          <Text className="text-base text-gray-100 font-pmedium mb-2">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")} className='mb-3'>
           {
            form?.video ? 
            (
              <Video
                source={{uri: form?.video.uri}}
                className='w-full h-40 rounded-2xl'
                resizeMode={ResizeMode.CONTAIN}
              />
            ) :
            (
           <View className='h-40 w-full rounded-2xl border-2 border-black-200 bg-black-100'>
              <View className='flex h-full justify-center items-center'>
                <Image
                  source={icons.upload}
                  className='w-12 h-12 border-dashed border-2 rounded-lg border-secondary-100 '
                  resizeMode='contain'
                />
              </View>
            </View>
            )}
          </TouchableOpacity>
          <View>
            <Text className="text-base text-gray-100 font-pmedium mb-2">
              Upload Thumbnail
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")} className='mb-2'>
              {
                form?.thumbnail ? 
                (
                  <Image
                    source={{uri: form?.thumbnail.uri}}
                    className='w-full h-40 rounded-2xl'
                    resizeMode='cover'
                  />
                ) :
                (
                  <View className='h-16 w-full rounded-2xl border-2 border-black-200 bg-black-100'>
                    <View className='flex flex-row h-full justify-center items-center'>
                      <Image
                        source={icons.upload}
                        className='w-6 h-6 '
                        resizeMode='contain'
                      />
                      <Text className='text-gray-100 text-sm font-pregular'>
                        Choose File
                      </Text>
                    </View>
                  </View>
                )
              }
            </TouchableOpacity>
          </View>
          <FormField
            title= 'AI Prompt'
            value={form?.prompt}
            placeholder='Give your video a AI prompt'
            handleChange={(value) => setForm({...form,prompt: value})}
            otherStyles='mb-3'
          />
          <CustomButton
            title='Upload'
            containerStyles='w-full'
            handlePress={handleSubmit}
            isLoading={uploading}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create