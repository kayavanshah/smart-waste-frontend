export const BACKEND_URL = "https://smart-waste-backend-l97b.onrender.com";

export const fetchWithAuth = async (url: string, options: RequestInit = {}, token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BACKEND_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  return res;
};
