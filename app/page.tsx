import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getInsights, getWorkouts } from "../lib/api";
import WorkoutClient from "./workoutClient";

export default async function Home() {
  // ✅ await the cookies() call
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log('token check',token)

  if (!token) {
    redirect("/register");
  }

  const insights = await getInsights(token);
  const workouts = await getWorkouts(token);

  return <WorkoutClient token={token} insights={insights} workouts={workouts} />;
}
