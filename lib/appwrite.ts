import { router } from 'expo-router';
import { Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage } from 'react-native-appwrite';
import { formDataI } from '../app/(tabs)/create';
import * as ImagePicker from 'expo-image-picker';
export const config = {
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.am.aura',
    projectId:'668ae764000789755548',
    databaseId:'668ae8860031648cee5c',
    userCollectionId:'668ae8ef003607d208ae',
    videoCollectionId:'668ae9070035366c3e6d',
    storageId:'668aea93003830866fa0'
}
const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
}= config
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export async function  createUser(email:string,password:string,username:string) {
    try {
        const newAccount = await account.create(ID.unique(),email,password,username)
        if(!newAccount) throw new Error
        const avatarUrl = avatars.getInitials(username)
        await signIn(email,password) 
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId:newAccount.$id,
                email,
                username,
                avatar:avatarUrl
            }
        )
        return newUser
    } catch (error) {
        throw new Error(error)
    }
}
export async function signIn(email:string,password:string){
    try {
        await account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw new Error(error)
    }
}   
export async function signOut(){
    try {
        await account.deleteSession('current')
        router.replace('/sign-in')
    } catch (error) {
        throw new Error(error)
    }
}
export async function getUser(){
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw new Error;
        const user = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        if(!user) throw new Error
        return user.documents[0] as any
    } catch (error) {
        throw new Error(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents.slice(0,4)
    } catch (error) {
        throw new Error(error)
    }
}

export const getSearchPosts = async (query:string) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title',query)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const userProfile = async (userId:string) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator',userId)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}
// upload to bucket
export const uploadFile = async (file:ImagePicker.ImagePickerAsset,type:string) => {
    if(!file) throw new Error('No file selected')
    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            {
            name:file.fileName,
            type:file.type,
            uri:file.uri,
            size:file.fileSize
            }
        );
        const fileUrl = await getFilePreview(uploadedFile.$id,type)
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}
// get url of file
export const getFilePreview = async (fileId:string,type:string) => {
    let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const createVideo = async (form:formDataI,userId:string) => {
  try {
    const [thumbnailUrl,videoUrl] = await Promise.all([
        uploadFile(form.thumbnail,'image'),
        uploadFile(form.video,'video')
    ])
    const newPost = await databases.createDocument(
        databaseId,
        videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: userId,
        }
      );

      return newPost;
  } catch (error) {
    throw new Error(error)
  }  
}