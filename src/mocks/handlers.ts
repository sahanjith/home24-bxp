import { rest } from 'msw';

import { Product } from '@/types';

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
    const categories = products.map((category) => ({
      id: category.id,
      name: category.category,
      subcategories: category.subCategories.map((sub) => ({
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
            sku: product.sku,
            url: product.url,
            available: product.available,
            description: product.description,
            colors: product.colors,
            ...(product.attributes && { attributes: product.attributes }),
          })),
      ),
    );

    return res(ctx.status(200), ctx.json(filteredProducts));
  }),
  rest.get('/api/product/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const product = products
      .flatMap((category) =>
        category.subCategories.flatMap((subCategory) => subCategory.products as Product[]),
      )
      .find((product) => (product as Product).id === productId);

    if (product) {
      return res(ctx.status(200), ctx.json(product));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
    }
  }),
  rest.put('/api/product/:productId', async (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const updatedData = await req.json();

    let foundProduct = null;

    products.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        const productIndex = subCategory.products.findIndex((p) => p.id === productId);
        if (productIndex !== -1) {
          subCategory.products[productIndex] = {
            ...subCategory.products[productIndex],
            ...updatedData,
          };
          foundProduct = subCategory.products[productIndex];
        }
      });
    });

    if (foundProduct) {
      return res(ctx.status(200), ctx.json({ message: 'Product updated successfully' }));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
    }
  }),
];
