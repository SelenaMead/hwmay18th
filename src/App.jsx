import React, { useState, useEffecth } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Inbox } from "./views/inbox";
import { Signin } from "./views/Signin";
import { Sent } from "./views/sent";
import { Trash } from "./views/trash";
import { Register } from "./views/register";
import { Unauthorized } from "./views/unauthorized";
import { useAuth } from './context/authProvider';

export const App = () => {

  const { currentUser } = useAuth();

  // THIS IS FOR API CALLS, BUT WE AREN'T USING THE API 
  // const [messageList, setMessageList] = useState([]);
  // const retrieveMessages = async() => {
    //fetch('api address')
      //.then(res => res.json())
      //.then(data => console.log(data))

  // }
  // useEffect(() => {
  //   retrieveMessages()
  // }, [])
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mt-4">
     
        {
          !currentUser.loggedIn ? 
          (
            <>
            
            <Routes>
            <Route exact path='/signin' element={ <Signin /> } />
            <Route exact path='/register' element={ <Register /> } />
            <Route path='*' element={ <Unauthorized /> } />
            </Routes>
            </>

            

          ):
          (
            
            <Routes>
            <Route exact path='/' element={ <Inbox /> } />
            <Route exact path='/sent' element={ <Sent /> } />
            <Route exact path='/trash' element={ <Trash /> } />
            </Routes>
            
          )
        }
        
        
       
      </main>
      <footer></footer>
    </>
  );
};
