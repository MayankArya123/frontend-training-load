"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import EditWorkoutModal from "./components/EditWorkoutModal";
import DeleteWorkoutModal from "./components/DeleteWorkoutModal";
import { logoutUser } from "@/lib/auth";

type Workout = {
  _id: string;
  title: string;
  duration: number;
  intensity: number;
  load: number;
  date: string;
  muscleGroup: string;
};

export default function WorkoutClient({
  token,
  insights,
  workouts,
}: {
  token: string;
  insights: any;
  workouts: Workout[];
}) {
  const [editWorkout, setEditWorkout] = useState<Workout | null>(null);
  const [deleteWorkout, setDeleteWorkout] = useState<Workout | null>(null);

  // <-- THIS is where you define them
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log("res from logout", res);
      router.push("/login");
    } catch (err: any) {}
  };

  return (
    <div className="">
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
      >
        Logout
      </button>

      <div className="w-[60%] mx-auto">
        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Training Load Dashboard</h1>

          <div className="border p-4 rounded space-y-1">
            <p>Current Week Load: {insights?.current}</p>
            <p>Previous Week Load: {insights?.previous}</p>
            <p>Fatigue Risk: {insights?.risk?.toUpperCase()}</p>
            <p>Plateau Detected: {insights?.plateau ? "YES" : "NO"}</p>
          </div>

          <WorkoutForm
            token={token}
            open={showForm}
            onClose={() => setShowForm(false)}
          />
          {/* Add Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-black text-white rounded cursor-pointer"
            >
              + Add Workout
            </button>
          </div>

          {/* READ / EDIT / DELETE */}
          <WorkoutList
            workouts={workouts}
            onEdit={(w) => {
              console.log("EDIT CLICKED", w); // 🔥 DEBUG
              setEditWorkout(w);
            }}
            onDelete={(w) => {
              console.log("delete clicked", w); // 🔥 DEBUG
              setDeleteWorkout(w);
            }}
          />

          <EditWorkoutModal
            token={token}
            workout={editWorkout}
            onClose={() => setEditWorkout(null)}
          />

          <DeleteWorkoutModal
            token={token}
            workout={deleteWorkout}
            onClose={() => setDeleteWorkout(null)}
          />
        </main>
      </div>
    </div>
  );
}
