let baseUrl: string | undefined;

export function getApiBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return process.env.VITE_API_BASE_URL || 'http://localhost:5173/api';
  }

  if (!baseUrl) {
    try {
      // Dynamically importing Vite-specific config in browser
      // This won't be executed during tests, otherwise it would give typescript errors
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const viteEnv = require('./env.vite');
      baseUrl = viteEnv.viteApiBaseUrl || '/api';

      if (!viteEnv.viteApiBaseUrl && viteEnv.isProd) {
        throw new Error('Missing VITE_API_BASE_URL');
      }
    } catch {
      // fallback for any unknown env
      baseUrl = '/api';
    }
  }

  return baseUrl || '/api';
}
