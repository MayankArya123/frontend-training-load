"use client";

import { useEffect, useState } from "react";
import { updateWorkout } from "../../lib/api";

type Workout = {
  _id: string;
  title: string;
  duration: number;
  intensity: number;
  muscleGroup: string;
  date: string;
};

export default function EditWorkoutModal({
  token,
  workout,
  onClose,
}: {
  token:string,
  workout: Workout | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Workout | null | any>(null);

  useEffect(() => {
    setForm(workout);
  }, [workout]);

  if (!form) return null;

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const load = form.duration * form.intensity;

      await updateWorkout(token,form._id, {
        ...form,
        load,
      });

    onClose();
    window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded space-y-3 w-96"
      >
        <h2 className="text-lg font-semibold">Edit Workout</h2>

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          type="number"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: Number(e.target.value) })
          }
          className="border p-2 w-full"
        />

        <input
          type="number"
          min={1}
          max={10}
          value={form.intensity}
          onChange={(e) =>
            setForm({ ...form, intensity: Number(e.target.value) })
          }
          className="border p-2 w-full"
        />

        <input
          value={form.muscleGroup}
          onChange={(e) =>
            setForm({ ...form, muscleGroup: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          type="date"
          value={form.date.slice(0, 10)}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 w-full"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-black text-white rounded cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
