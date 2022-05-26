import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authProvider'

export const Navbar = () => {

  const { signOff, currentUser } = useAuth();
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            Messenger
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
           { currentUser.loggedIn ?
            (
              <>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Inbox <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sent">
                  Sent
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trash">
                  Trash
                </Link>
              </li>
            </ul>
              </>
            )
            : null
}
            <ul className='navbar-nav ml-auto'> 
              {
                !currentUser.loggedIn ?
                (
                          
            
            <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Log In 
                </Link>
              </li>
             
                
                ):
                (
                  <li className="nav-item">
                  <Link onClick={ signOff } className="nav-link" to="/signin">
                    Log Off
                  </Link>
                </li>
                )
              }
              </ul>
          </div>
        </nav>
  )
}
