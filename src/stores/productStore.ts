import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Product } from '@/types';

interface ProductStore {
  products: Product[];
  lastModifiedProduct: Product | null;
  selectedCategory: number | null;
  setProducts: (products: Product[]) => void;
  updateProduct: (updated: Product) => void;
  setLastModifiedProduct: (product: Product | null) => void;
  setSelectedCategory: (categoryId: number | null) => void;
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const useProductStore = create<ProductStore>()(
  devtools(
    (set) => ({
      products: [],
      lastModifiedProduct: null,
      selectedCategory: null,
      setProducts: (products) => set({ products }, false, 'setProducts'),
      updateProduct: (updated) =>
        set(
          (state) => ({
            products: state.products.map((p) => (p.id === updated.id ? updated : p)),
            lastModifiedProduct: updated,
          }),
          false,
          'updateProduct',
        ),
      setLastModifiedProduct: (product) =>
        set({ lastModifiedProduct: product }, false, 'setLastModifiedProduct'),
      setSelectedCategory: (categoryId) =>
        set({ selectedCategory: categoryId }, false, 'setSelectedCategory'),
      drawerVisible: false,
      setDrawerVisible: (visible) => set({ drawerVisible: visible }, false, 'setDrawerVisible'),
      selectedProduct: null,
      setSelectedProduct: (product) =>
        set({ selectedProduct: product }, false, 'setSelectedProduct'),
    }),
    { name: 'ProductStore' },
  ),
);
