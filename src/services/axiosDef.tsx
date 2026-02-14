import axios, { type AxiosResponseTransformer } from "axios";

const BASE_URL = "http://localhost:8080";

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

const bigIntSafeTransform: AxiosResponseTransformer = (data) => {
  if (typeof data !== "string" || data.length === 0) return data;
  const safe = data.replace(/("[-_a-zA-Z0-9]+"\s*:\s*)(-?\d{16,})(\s*[,\}])/g, '$1"$2"$3');
  try {
    return JSON.parse(safe);
  } catch {
    return JSON.parse(data);
  }
};

const axiosBase = axios.create({
  baseURL: BASE_URL,
});

export default axiosBase;

export const axiosDef = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  transformResponse: [bigIntSafeTransform, ...(axios.defaults.transformResponse as any)],
});

export const axiosLogin = axios.create({
  baseURL: BASE_URL,
});

axiosDef.interceptors.request.use((config) => {
  const token = getCookie("jwt-token");
  if (token && !config.headers?.Authorization) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axiosDef.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error?.response?.status === 401) {
      document.cookie = "jwt-token=; Max-Age=0; path=/";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
