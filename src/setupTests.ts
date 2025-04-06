import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// polyfilling TextEncoder and TextDecoder for jest
globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

process.env.VITE_API_BASE_URL = 'http://localhost:5173/api';

// mocking matchMedia globally to execute the tests, known issue when using Ant Design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

// ignorting the antd warning about the compatible version, can be removed when antd supports React 19
const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (args[0]?.includes('[antd: compatible]')) return;
    originalError.call(console, ...args);
  });
});
