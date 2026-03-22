const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3001";

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data: ApiResponse<T> = await response.json();
  return data;
}

export async function register(payload: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  captchaToken: string;
}) {
  return apiCall("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: { email: string; password: string }) {
  return apiCall("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyEmail(token: string) {
  return apiCall("/api/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function resendVerification(email: string) {
  return apiCall("/api/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function getTopics() {
  return apiCall("/api/topics", {
    method: "GET",
  });
}

export async function getTopicById(id: string) {
  return apiCall(`/api/topics/${id}`, {
    method: "GET",
  });
}

export async function getTopicBySlug(slug: string) {
  return apiCall(`/api/topics/slug/${slug}`, {
    method: "GET",
  });
}
