import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) navigate("/dashboard", { replace: true });
  }, []); // run only on mount

  const validate = () => {
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const resp = await axios.post("http://localhost:3000/api/auth/admin", {
        email,
        password,
      });

      const { token, user } = resp.data; // backend returns { token, user }

      if (!token) throw new Error("Invalid server response.");

 localStorage.setItem("token", token);   // REQUIRED for protected routes
localStorage.setItem("adminToken", token);  // optional
localStorage.setItem("admin", JSON.stringify(user));


      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            disabled={loading}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Password
          <div style={styles.pwRow}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              disabled={loading}
              style={{ ...styles.input, marginRight: 8 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              style={styles.toggleBtn}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ ...styles.submit, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

// Styles (same as before)
const styles = { /* ...keep your previous styles... */ };

export default AdminLogin;
