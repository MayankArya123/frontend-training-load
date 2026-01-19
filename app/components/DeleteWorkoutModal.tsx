"use client";
import { deleteWorkout } from "../../lib/api";
import { useState, useEffect } from "react";

export default function EditWorkoutModal({
  workout,
  onClose,
}: {
  workout: any;
  onClose: () => void;
}) {
  const [form, setForm] = useState<null | any>(null);

  useEffect(() => {
    setForm(workout);
  }, [workout]);

  if (!form) return null;

  async function handleDelete() {
    await deleteWorkout(workout?._id);
    onClose();
    window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded space-y-4 w-80">
        <h2 className="text-lg font-semibold">Delete Workout?</h2>

        <p className="text-sm text-zinc-600">This action cannot be undone.</p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
