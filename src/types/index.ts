export interface LoginFormValues {
  username: string;
  password: string;
}

export interface ProductAttribute {
  attributeName: string;
  attributeType: 'number' | 'text' | 'url' | 'tags' | 'boolean';
  attributeValue: number | string | string[] | boolean;
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
  attributes?: ProductAttribute[];
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
