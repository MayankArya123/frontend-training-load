type Workout = {
  _id: string;
  title: string;
  duration: number;
  intensity: number;
  load: number;
  date: string;
  muscleGroup: string;
};

export default function WorkoutList({
  workouts,
  onEdit,
  onDelete,
}: {
  workouts: Workout[];
  onEdit: (w: Workout) => void;
  onDelete: (w: Workout) => void;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">
        {" "}
        {workouts.length === 0
          ? "no workouts"
          : `total ${workouts.length}`}{" "}
      </h2>

      {workouts.length > 0 &&
        workouts.map((w) => (
          <div
            key={w._id}
            className="border rounded-lg p-4 bg-white shadow-sm flex justify-between gap-4"
          >
            {/* LEFT CONTENT */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{w.title}</h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-zinc-700">
                <p>
                  <span className="font-semibold">Duration:</span> {w.duration}{" "}
                  min
                </p>

                <p>
                  <span className="font-semibold">Intensity:</span>{" "}
                  {w.intensity}/10
                </p>

                <p>
                  <span className="font-semibold">Muscle Group:</span>{" "}
                  {w.muscleGroup}
                </p>

                <p>
                  <span className="font-semibold">Load:</span> {w.load}
                </p>
              </div>

              <p className="text-xs text-zinc-500">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(w.date).toDateString()}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col justify-start gap-2">
              <button
                onClick={() => onEdit(w)}
                className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(w)}
                className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
