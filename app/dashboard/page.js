"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../lib/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const user = useAuth();
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [targets, setTargets] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch food logs
        const snapshot = await getDocs(collection(db, "users", user.uid, "foodLogs"));
        let sum = { calories: 0, protein: 0, carbs: 0, fats: 0 };
        snapshot.forEach(doc => {
          const data = doc.data();
          sum.calories += data.calories || 0;
          sum.protein += data.protein || 0;
          sum.carbs += data.carbs || 0;
          sum.fats += data.fats || 0;
        });
        setTotals(sum);

        // Fetch targets
        const targetsDoc = await getDoc(doc(db, "users", user.uid, "targets", "daily"));
        if (targetsDoc.exists()) {
          setTargets(targetsDoc.data());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  const remaining = {
    calories: (targets?.calories || 0) - totals.calories,
    protein: (targets?.protein || 0) - totals.protein,
    carbs: (targets?.carbs || 0) - totals.carbs,
    fats: (targets?.fats || 0) - totals.fats,
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <progress value={totals.calories} max={targets?.calories || 0}></progress>
      <p>Calories: {totals.calories}/{targets?.calories} kcal (Remaining: {remaining.calories})</p>
      <p>Protein: {totals.protein}/{targets?.protein} g (Remaining: {remaining.protein})</p>
      <p>Carbs: {totals.carbs}/{targets?.carbs} g (Remaining: {remaining.carbs})</p>
      <p>Fats: {totals.fats}/{targets?.fats} g (Remaining: {remaining.fats})</p>

      <nav>
        <Link href="/profile">Edit Profile</Link> |{" "}
        <Link href="/macros">View Macros</Link> |{" "}
        <Link href="/foodlog">Log Food</Link>
      </nav>
    </div>
  );
}