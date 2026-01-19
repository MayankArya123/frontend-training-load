const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function getWorkouts(token: string) {
  const res = await fetch(`${API_URL}/api/workouts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

export async function getInsights(token: string) {
  const res = await fetch(`${API_URL}/api/workouts/insights/weekly`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch insights");
  }

  return res.json();
}
export async function createWorkout(token: string, data: any) {
  const res = await fetch(`${API_URL}/api/workouts`, {
    method: "POST",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create workout");
  }

  return res.json();
}

export async function updateWorkout(
  token: string,
  id: string,
  data: any
) {
  const res = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "PUT",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update workout");
  }

  return res.json();
}

export async function deleteWorkout(token: string, id: string) {
  const res = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete workout");
  }
}
