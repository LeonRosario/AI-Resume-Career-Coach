import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function register(name, email, password) {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
}

export async function uploadResume(formData, token) {
  const { data } = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
