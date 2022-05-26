import { addDoc, collection, collectionGroup, getDoc, getDocs, query } from "firebase/firestore";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./authProvider";

export const DataContext = createContext()

export function useData() {
    return useContext( DataContext )
}

export const DataProvider = ( { children } ) => {

    const [messages, setMessages] = useState( [] )
    const { currentUser } = useAuth();

    const getMessages = useCallback(
      async () => {

        const q = query(
            collectionGroup( db, 'messages' )
        )
        const querySnapshot = await getDocs( q )
        let retrievedMessages = []
            querySnapshot.forEach( async (post) => {
                const userRef = await getDoc( post.ref.parent.parent )

                retrievedMessages.push({
                    id: post.id,
                    ...post.data(),
                    user: {
                        id: userRef.id,
                        ...userRef.data()
                    }
                })

                setMessages( messages.concat( retrievedMessages ) )

            } )

            return querySnapshot

      },
      [ db ],
    )

    const addMessages = async( formData ) => {
        // get a reference of the current user's posts collection
        let collectionRef = await collection( db, 'users', currentUser.id, 'messages' )

        // execute a function to add new document to collection based on the formData
        const docRef = await addDoc( collectionRef, formData )

        const newDoc = await getDoc( docRef )

        const userRef = await getDoc( docRef.parent.parent )

        // call setPosts to set it equal the current list of posts + new post data
        let dataToAddToMessageList = {
            id: newDoc.id,
            ...newDoc.data(),
            user: {
                id: currentUser.id,
                ...userRef.data()
            }
        }
        setMessages([ dataToAddToMessageList, ...messages ] )
    }


    useEffect(() => {
        getMessages()
    }, [ getMessages])

    const context = {
        messages, addMessages
    }

    return (
        <DataContext.Provider value={ context }>
            { children }
        </DataContext.Provider>
    )

} 