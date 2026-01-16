"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginWithFacebook = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // After login, redirect to profile or dashboard
      // For simplicity, always go to profile first
      router.push("/profile");
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  const guestLogin = () => {
    // Generate a temporary guest UID
    const guestUser = { uid: "guest_" + Date.now(), displayName: "Guest User" };
    // Redirect to profile for guest setup
    router.push("/profile");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Calorie Tracker</h1>
      <p>Login to start tracking your macros and food logs.</p>

      <button onClick={loginWithFacebook} disabled={loading}>
        {loading ? "Logging in..." : "Login with Facebook"}
      </button>

      <br /><br />

      <button onClick={guestLogin}>Continue as Guest</button>
    </div>
  );
}