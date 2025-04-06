import type { TreeDataNode } from 'antd';

interface CategoryResponse {
  id: number;
  name: string;
  subcategories: {
    id: number;
    name: string;
  }[];
}

// converts API response from `/api/categories` into Ant Design tree structure
export function mapCategoriesToTreeData(categories: CategoryResponse[]): TreeDataNode[] {
  return categories.map((category) => ({
    title: category.name,
    key: `${category.id}`,
    children: category.subcategories.map((sub) => ({
      title: sub.name,
      key: `${sub.id}`,
      isLeaf: true,
    })),
  }));
}
