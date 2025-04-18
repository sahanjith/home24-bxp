export interface LoginFormValues {
  username: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number; // refers to subCategory id
  sku: number;
  url: string;
  available: boolean;
  description?: string;
  colors?: string[];
}

export interface SubCategory {
  id: number;
  parentId: number; // refers to category id
  subCategory: string;
  products: Product[];
}

export interface Category {
  id: number;
  category: string;
  subCategories: SubCategory[];
}
