import { rest } from 'msw';

import { Category, SubCategory } from '@/types';

import { demoCredentials } from './config';
import { products } from '../../__mocks__/data/productData';

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
  rest.get('/api/categories', (_req, res, ctx) => {
    const categories = products.map((category: Category) => ({
      id: category.id,
      name: category.category,
      subcategories: category.subCategories.map((sub: SubCategory) => ({
        id: sub.id,
        name: sub.subCategory,
      })),
    }));

    return res(ctx.status(200), ctx.json(categories));
  }),
  rest.get('/api/products/:categoryId', (req, res, ctx) => {
    const categoryId = Number(req.params.categoryId);
    const filteredProducts = products.flatMap((category) =>
      category.subCategories.flatMap((subCategory) =>
        subCategory.products
          .filter((product) => product.categoryId === categoryId)
          .map((product) => ({
            id: product.id,
            name: product.name,
            categoryId: product.categoryId,
            attributes: product.attributes,
          })),
      ),
    );

    return res(ctx.status(200), ctx.json(filteredProducts));
  }),
];
