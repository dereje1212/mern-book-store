import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import "./Register.css";

const Register = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Firebase registration error:", error);
      setMessage(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google sign-in successful!");
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>User Name</label>
            <input {...register("name", { required: true })} type="text" placeholder="User Name" className="form-input" />
            {errors.name && <p className="error-message">Username is required</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input {...register("email", { required: true })} type="email" placeholder="Email Address" className="form-input" />
            {errors.email && <p className="error-message">Email is required</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input {...register("password", { required: true })} type="password" placeholder="Password" className="form-input" />
            {errors.password && <p className="error-message">Password is required</p>}
          </div>

          {message && <p className="error-message">{message}</p>}

          <div className="button-group">
            <button type="submit" className="btn-primary">Register Now</button>
          </div>
        </form>

        <p className="register-text">
          Have an account? <Link to="/login" className="link">Login</Link>
        </p>

        <div className="google-signin">
          <button onClick={handleGoogleSignIn} className="btn-google">
            <FaGoogle className="google-icon" />
            Sign in with Google
          </button>
        </div>

        <p className="footer-text">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
