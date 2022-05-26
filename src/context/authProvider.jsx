import { createContext, useContext, useEffect, useState } from "react"
import { getAuth, GoogleAuthProvider,  signInWithPopup, signInWithEmailAndPassword,  setPersistence, browserLocalPersistence, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export function useAuth() {
    return useContext( AuthContext )
}

export const AuthProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState({ loggedIn: false })

    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    const register = (formData) => {

        console.log(formData)
        if(formData.password == formData.confirmPassword){

            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const userRef = doc(db, 'users', user.uid);
                    setDoc( userRef, { email: formData.email, name: `${formData.firstName} ${formData.lastName}` }, { merge: true } )
                    console.log("User was registered successfully")
                })
                .catch ((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message
                });
            }
    

    }

    const signIn = (formData, providerOption) => {

        const {email, password} = formData;
        
        switch (providerOption){
            case 'google':
                signInWithPopup( auth, provider)
                    .then( result => {
                        console.log('User logged in successfully');
                        const userRef = doc(db, 'users', result.user.uid);
                        setDoc(userRef, {name: result.user.displayName}, {merge: true})


                    });
                break;
            case 'password':
                signInWithEmailAndPassword( auth, email.value, password.value)
                    .then( (userCredential) => {
                        const user = userCredential.user;
                        const userRef = doc(db, 'users', result.user.uid);
                        setDoc(userRef, {name: result.user.displayName}, {merge: true})
                    })
                    .catch(( error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        console.error(error)
                    });
                break;
            default:
                break;
        }
             

        // console.log(e.target.email.value)
        // console.log(e.target.password.value)

        //const {email, password} = e.target;

        // return setPersistence( auth, browserLocalPersistence )
        //     .then( () => {
        //         signInWithPopup( auth, provider )
        //             .then( result => {
        //                 console.log('User logged in successfully')
        //             } )
        //     } )
        //     .catch( err => console.log( err ) )

    }

    const signOff = () => {
        signOut( auth )
            .then( () => {
                setCurrentUser({ loggedIn: false })
                console.log('User logged out successfully')
            } )
    }

    useEffect(() => {
        onAuthStateChanged( auth, user => {
            if( user ) {

                // once the user logs in, we need to add the user to the database as a reference
                // query the users collection to find the user
                const userRef = doc( db, 'users', user.uid );

                // if the user doesn't exist, add user to database
                // otherwiser, if the user does exist, overwrite (not duplicate) the user's info
                (async () => {
                    const userData = await getDoc(userRef)
                    const retrievedUser = userData.data()
               
                setCurrentUser({
                    id: userData.id,
                    name: retrievedUser.name,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                })
            })();
            }
        } )
        // make useEffect render when you want to
        // render once = []
        // render every time component updates = ''
        // render whenever some data changes = [ data ]
    }, [ auth ])

    const context = {
        currentUser, signIn, signOff, register
    }

    return (
        <AuthContext.Provider value={ context }>
            { children }
        </AuthContext.Provider>
    )
} 