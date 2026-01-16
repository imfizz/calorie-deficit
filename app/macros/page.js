"use client";

import { useEffect, useState } from "react";
import { calculateTDEE, macroTargets } from "../../lib/tdee";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";

export default function MacroPage() {
  const router = useRouter();
  const user = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading || !profile) {
    return <p>Loading...</p>;
  }

  const tdee = calculateTDEE(profile.weight, profile.height, profile.age, profile.gender, profile.activityLevel);
  const targets = macroTargets(tdee, profile.goal);

  const saveTargets = async () => {
    await setDoc(doc(db, "users", user.uid, "targets", "daily"), targets);
    router.push("/dashboard");
  };

  return (
    <div>
      <h2>Your Targets</h2>
      <p>Calories: {targets.calories}</p>
      <p>Protein: {targets.protein}g</p>
      <p>Carbs: {targets.carbs}g</p>
      <p>Fats: {targets.fats}g</p>
      <button onClick={saveTargets}>Go to Dashboard</button>
    </div>
  );
}