import React from 'react'
import { useAuth } from "../context/authProvider";

export const Register = () => {

  const {register} = useAuth();

  const handleRegistration = (e) => {
    e.preventDefault();
    const data = e.target;
    const formData = {
      firstName: data.firstName.value,
      lastName: data.lastName.value, 
      email: data.email.value, 
      password: data.password.value,
      confirmPassword: data.confirmPassword.value
    };
    register(formData);
  }
  return (
    <div className="row container">
       
        <div className="col-md-12">
        <h1>Register</h1>
            <form onSubmit={handleRegistration}>
            <div className="form-group">
                  <input type="text"
                    className="form-control" name="firstName"  aria-describedby="helpId" placeholder="First Name"/>
                </div>
            <div className="form-group">
                  <input type="text"
                    className="form-control" name="lastName"  aria-describedby="helpId" placeholder="Last Name"/>
                </div>
                <div className="form-group">
                  <input type="email"
                    className="form-control" name="email"  aria-describedby="helpId" placeholder="Email"/>
                </div>
                <div className="form-group">
                  <input type="password"
                    className="form-control" name="password"  aria-describedby="helpId" placeholder="Password"/>
                </div>
                <div className="form-group">
                  <input type="password"
                    className="form-control" name="confirmPassword"  aria-describedby="helpId" placeholder="Confirm Password"/>
                </div>
                <input className= 'btn btn-info btn-block' type='submit' value='Register'/>
            </form>
        </div>
    </div>
  )
}