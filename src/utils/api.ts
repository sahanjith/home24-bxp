const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (!baseUrl) {
  if (import.meta.env.PROD) {
    throw new Error('Missing required environment variable: VITE_API_BASE_URL');
  } else {
    console.warn(
      'VITE_API_BASE_URL is not defined. Falling back to "/api". Make sure VITE_API_BASE_URL is set in your .env file.',
    );
  }
}

export const API_BASE_URL = baseUrl || '/api';
