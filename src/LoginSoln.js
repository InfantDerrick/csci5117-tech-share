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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/chat");
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Sign up successful:", userCredential.user);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

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
