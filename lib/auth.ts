const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ⭐ important for cookies
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function logoutUser() {
 const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include", // send the cookie to server
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}
