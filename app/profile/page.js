"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuth();
  const [profile, setProfile] = useState({
    age: "", height: "", weight: "", gender: "male",
    activityLevel: "moderate", goal: "fat loss"
  });

  const saveProfile = async () => {
    if (!user) {
      alert("No user logged in!");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { ...profile, name: user.displayName || "Guest" });
    router.push("/macros");
  };

  return (
    <div>
      <h2>Profile</h2>
      <input placeholder="Age" onChange={e => setProfile({...profile, age: e.target.value})}/>
      <input placeholder="Height (cm)" onChange={e => setProfile({...profile, height: e.target.value})}/>
      <input placeholder="Weight (kg)" onChange={e => setProfile({...profile, weight: e.target.value})}/>

      <select onChange={e => setProfile({...profile, gender: e.target.value})}>
        <option>male</option><option>female</option>
      </select>
      <select onChange={e => setProfile({...profile, activityLevel: e.target.value})}>
        <option>sedentary</option><option>moderate</option><option>active</option>
      </select>
      <select onChange={e => setProfile({...profile, goal: e.target.value})}>
        <option>fat loss</option><option>maintenance</option><option>muscle gain</option>
      </select>

      <button onClick={saveProfile}>Save</button>
    </div>
  );
}