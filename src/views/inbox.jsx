import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { AuthContext, useAuth } from '../context/authProvider';
import { useData} from '../context/storeProvider';

export const Inbox = () => {

    const [ messageList, setMessageList ] = useState([]);
    const [orderedMessages, setOrderedMessages] = useState([]);
    const messageBody = useRef(''); 
    const recBody = useRef('');

    
    

   const {currentUser} = useAuth();
   const {messages, addMessages} = useData();

   console.log(messageList.map((recipient, index) =>  (recipient.recipient))[1])

   
//  const retrieveMessages = async () => {

//     const querySnapshot = await getDocs(collection( db, 'messages' ))

//    let filteredMessageList = []
//     querySnapshot.forEach( doc => {
//         // console.log( doc.id )
//         filteredMessageList.push( { ...doc.data(), id: doc.id } )
//         let sortedMessages = filteredMessageList.sort( (a, b) => b.dateCreated - a.dateCreated )
//         setOrderedMessages( sortedMessages );
//     } )
    const handleSubmit = ( e ) => {
        e.preventDefault();

        let dataToSend = {
            body: messageBody.current.value,
            recipient: recBody.current.value,
            dateCreated: serverTimestamp()
        };
        addMessages( dataToSend )

        messageBody.current.value = ''
        recBody.current.value = ''
    };
    useEffect( () => {
         //retrieveMessages()
        setMessageList( messages );
    }, [messages] );
  

  return (
    <div className="row">
    <div className="col-md-12">
      <h1>Hello, {currentUser.name}</h1>
      <p>Here's your messages</p>
      <form onSubmit={ handleSubmit }>
        <div className="row">
          <div className="col-md-10">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="messageBody"
                aria-describedby="helpId"
                placeholder="What do you want to say?"
                ref={messageBody}
              />
               <input
                type="text"
                className="form-control"
                name="recBody"
                aria-describedby="helpId"
                placeholder="Who do you want to send this to? "
                ref={recBody}
              />
            </div>
          </div>
        









          <div className="col-md-2">
            <input className="btn btn-primary btn-block" type="submit" value="Send"/>
          </div>
        </div>
      </form>
      <hr />
      <ul className="list-group">
                  { 

                      messageList.length !== 0 && messageList. ?
                          messageList.map((post) => (
                              <li key={post.id} className="list-group-item">
                                  <p>{post.body} </p>
                                  <div>
                                      <small>
                                          &mdash; {`${ post.user.name }`}
                                          <span className="float-right">{ moment( post.dateCreated.toDate() ).fromNow() }</span>
                                      </small>
                                  </div>
                              </li>
                          )) :
                          <div className="spinner-border text-info mx-auto" role="status">
                              <span className="sr-only">Loading...</span>
                          </div>
                  }
              </ul>
    </div>
  </div>
  )
  }
