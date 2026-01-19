"use client";

import { useState } from "react";
import { createWorkout } from "../../lib/api"

export default function WorkoutForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    duration: 30,
    intensity: 5,
    muscleGroup: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    duration: "",
    intensity: "",
    muscleGroup: "",
    date: "",
  });

  const muscleGroups = [
    "Chest",
    "Back",
    "Legs",
    "Arms",
    "Shoulders",
    "Core",
    "Full Body",
  ];

  if (!open) return null;

  const validate = () => {
    const newErrors = {
      title: "",
      duration: "",
      intensity: "",
      muscleGroup: "",
      date: "",
    };
    let isValid = true;

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!form.duration || form.duration < 1) {
      newErrors.duration = "Duration must be at least 1 minute";
      isValid = false;
    }
    if (!form.intensity || form.intensity < 1 || form.intensity > 10) {
      newErrors.intensity = "Intensity must be between 1 and 10";
      isValid = false;
    }
    if (!form.muscleGroup) {
      newErrors.muscleGroup = "Muscle Group is required";
      isValid = false;
    }
    if (!form.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await createWorkout(form);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={submit}
        className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg"
      >
        <h2 className="text-xl font-semibold">Add Workout</h2>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Title</label>
          <input
            className="w-full border rounded p-2"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
        </div>

        {/* Duration & Intensity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Duration (min)</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: +e.target.value })
              }
              min={1}
            />
            {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Intensity (1–10)</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={form.intensity}
              min={1}
              max={10}
              onChange={(e) =>
                setForm({ ...form, intensity: +e.target.value })
              }
            />
            {errors.intensity && <p className="text-red-500 text-xs">{errors.intensity}</p>}
          </div>
        </div>

        {/* Muscle Group */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Muscle Group</label>
          <select
            className="w-full border rounded p-2"
            value={form.muscleGroup}
            onChange={(e) =>
              setForm({ ...form, muscleGroup: e.target.value })
            }
          >
            <option value="">Select Muscle Group</option>
            {muscleGroups.map((mg) => (
              <option key={mg} value={mg}>
                {mg}
              </option>
            ))}
          </select>
          {errors.muscleGroup && (
            <p className="text-red-500 text-xs">{errors.muscleGroup}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
          {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded cursor-pointer"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
}
