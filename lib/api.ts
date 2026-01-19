const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function getMe() {
  const res = await fetch(`${API_URL}/api/users/me`, {
    credentials: "include", // 🔥 cookie sent automatically
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function getInsights() {
  const res = await fetch(`${API_URL}/api/workouts/insights/weekly`, {
    credentials: "include",
  });
  return res.json();
}

export async function getWorkouts() {
  const res = await fetch(`${API_URL}/api/workouts`, {
    credentials: "include",
  });
  return res.json();
}
export async function createWorkout(data: any) {
  const res = await fetch(`${API_URL}/api/workouts`, {
    method: "POST",
    headers: {
      ...jsonHeaders,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create workout");
  }

  return res.json();
}

export async function updateWorkout(id: string, data: any) {
  const res = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "PUT",
    headers: {
      ...jsonHeaders,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update workout");
  }

  return res.json();
}

export async function deleteWorkout( id: string) {
  const res = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "DELETE",
    headers: {
      ...jsonHeaders,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete workout");
  }
}
