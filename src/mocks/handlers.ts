import { rest } from 'msw';

interface LoginRequestBody {
  username: string;
  password: string;
}

export const handlers = [
  rest.post('/api/login', async (req, res, ctx) => {
    const { username, password }: LoginRequestBody = await req.json();

    if (username === 'demo@home24.com' && password === 'password123') {
      return res(ctx.status(200), ctx.json({ token: 'mock-token-12345' }));
    }

    return res(ctx.status(401), ctx.json({ message: 'Invalid username or password' }));
  }),
];
