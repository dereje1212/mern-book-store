import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import './Login.css';

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();

  const { register, handleSubmit } = useForm();

  // ✅ redirect after login
  const from = location.state?.from || "/dashboard/manage-books";

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Login successful!");
      navigate(from, { replace: true }); // redirect to intended page
    } catch (error) {
      setMessage("Invalid email or password");
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google Sign-in successful!");
      navigate(from, { replace: true }); // redirect to intended page
    } catch (error) {
      alert("Google sign-in failed!");
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="form-input"
            />
          </div>

          {message && <p className="error-message">{message}</p>}

          <div className="button-group">
            <button type="submit" className="btn-primary">Login</button>
          </div>
        </form>

        <p className="register-text">
          Haven’t an account? Please <Link to="/register" className="link">Register</Link>
        </p>

        <div className="google-signin">
          <button onClick={handleGoogleSignIn} className="btn-google">
            <FaGoogle className="google-icon" />
            Sign up with Google
          </button>
        </div>

        <p className="footer-text">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
