import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { auth } from './firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);



  /*
    TODO: Write a function to handle user sign up. 
    The function should take in the user's email and password and attempt to create a new user account with Firebase authentication using createUserWithEmailAndPassword method. 
    If successful, log the new user's information to the console and navigate to the chat page. 
    If there is an error, set the error state with the error message.
  */
  const handleSignUp = () => {};

  /*
    TODO: Implement login functionality. This function should attempt to sign in the user using their email and password. 
    If successful, it should navigate the user to the chat page. 
    Otherwise, it should display the error message returned by Firebase.

  */
  const handleLogin = () => {};

  /*
    TODO: This useEffect hook is used to redirect the user to the chat page if they are already authenticated. 
    You may consider adding a comment to explain this behavior.
  */

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card mt-5">
            <div className="card-header bg-dark text-light text-center">
              <h4>{isSignUp ? "Create Account" : "Login"}</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {isSignUp ? (
                <form onSubmit={handleSignUp}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Create Account
                  </button>
                  <p className="mt-3 mb-0 text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={handleToggle}
                    >
                      Login
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Login
                  </button>
                  <p className="mt-3 mb-0 text-center">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={handleToggle}
                    >
                      Create Account
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
