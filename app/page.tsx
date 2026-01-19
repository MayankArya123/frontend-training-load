import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getInsights, getWorkouts,getMe } from "../lib/api";
import WorkoutClient from "./workoutClient";

export default async function Home() {
  // ✅ await the cookies() call

    // ✅ Ask backend if user is logged in
  const user = await getMe();
  console.log('check logged in user',user)

  if (!user) {
    redirect("/register");
  }

  const insights = await getInsights();
  const workouts = await getWorkouts();

  return <WorkoutClient insights={insights} workouts={workouts} />;
}
