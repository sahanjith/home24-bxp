// This file is to isolate the vite-only logic so that Jest never touches it.
// It is required to execute the tests.
export const viteApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const isProd = import.meta.env.PROD;
