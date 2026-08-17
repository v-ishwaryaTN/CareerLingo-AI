import React, { useState } from "react";
import { registerUser, loginUser } from "../api/api";

export default function Auth({ onLoggedIn }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const data =
        mode === "login"
          ? await loginUser(form.email, form.password)
          : await registerUser(form.name, form.email, form.password, "ta");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLoggedIn(data.user, data.token);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "60px auto", padding: 24, fontFamily: "sans-serif" }}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      {mode === "register" && (
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, marginBottom: 10, border: "1px solid #ddd" }}
        />
      )}
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10, border: "1px solid #ddd" }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10, border: "1px solid #ddd" }}
      />

      {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100%", padding: 12, background: "#201A1D", color: "#fff", border: "none" }}
      >
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
      </button>

      <p style={{ fontSize: 13, marginTop: 12, textAlign: "center" }}>
        {mode === "login" ? "New here?" : "Already have an account?"}{" "}
        <span
          style={{ color: "#1D3557", cursor: "pointer" }}
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
}