import { rest } from 'msw';

import { demoCredentials } from './config';

interface LoginRequestBody {
  username: string;
  password: string;
}

export const handlers = [
  rest.post('/api/login', async (req, res, ctx) => {
    const { username, password }: LoginRequestBody = await req.json();

    if (username === demoCredentials.username && password === demoCredentials.password) {
      return res(ctx.status(200), ctx.json({ token: 'mock-token-12345' }));
    }

    return res(ctx.status(401), ctx.json({ message: 'Invalid username or password' }));
  }),
];
