import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";

export const Signin = () => {
  
  const {signIn} = useAuth();

  const handleSignIn = (e, providerOption) => {
    e.preventDefault();

    const {email, password} = e.target;
    signIn( {email, password},  providerOption);



  }

  return (
    <div className="row container">
      <div className="col-md-12">
        <h1>Login </h1>
        <form onSubmit={ (e) => handleSignIn(e, 'password') }>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="helpId"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              aria-describedby="helpId"
              placeholder="Password"
            />
          </div>
          <input
            className="btn btn-info btn-block"
            type="submit"
            value="Login"
          />
          <hr />
          <input 
              onClick={ (e) => handleSignIn(e, 'google') }
              className="btn btn-success" 
              type="button" 
             value="Sign in with Google" />
        </form>
      </div>
      <Link className="nav-link" to="/register">
        Haven't created an account yet? Click here to register!
      </Link>
    </div>
  );
};
