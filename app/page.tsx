"use client";

import { useEffect, useState } from "react";
import { getInsights, getWorkouts, getMe } from "../lib/api";
import WorkoutClient from "./workoutClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [insights, setInsights] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const user = await getMe();
      if (!user) return router.push("/register");

      const [i, w] = await Promise.all([getInsights(), getWorkouts()]);
      setInsights(i);
      setWorkouts(w);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return <WorkoutClient insights={insights} workouts={workouts} />;
}
