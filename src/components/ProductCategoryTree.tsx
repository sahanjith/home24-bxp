import { Tree, TreeDataNode, Input } from 'antd';
import { useEffect, useState } from 'react';

import { mapCategoriesToTreeData } from '@/helpers/productCategoryTree';
import { handleError } from '@/utils/handleError';

interface ProductCategoryTreeProps {
  onCategorySelect: (categoryKey: number) => void;
}

const ProductCategoryTree = ({ onCategorySelect }: ProductCategoryTreeProps) => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        const children = mapCategoriesToTreeData(data);

        setTreeData([
          {
            title: 'All Products',
            key: 'root',
            children,
          },
        ]);

        // setting the first child as expanded by default
        if (children.length > 0) {
          setExpandedKeys(['root', children[0].key]);
        } else {
          setExpandedKeys(['root']);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchCategories();
  }, []);

  const getExpandedKeysForSearch = (data: TreeDataNode[], query: string): React.Key[] => {
    const keys = new Set<React.Key>();

    const traverse = (nodes: TreeDataNode[], parentKey?: React.Key) => {
      nodes.forEach((node) => {
        const title = node.title?.toString().toLowerCase();
        if (title?.includes(query.toLowerCase()) && parentKey) {
          keys.add(parentKey);
        }
        if (node.children) {
          traverse(node.children, node.key);
        }
      });
    };

    traverse(data);
    return Array.from(keys);
  };

  const handleSelect = (
    selectedKeys: React.Key[],
    info: {
      selected: boolean;
      node: TreeDataNode;
    },
  ) => {
    if (selectedKeys.length > 0 && !info.node.children) {
      onCategorySelect(selectedKeys[0] as number);
    }
  };

  return (
    <div className="p-2">
      <Input.Search
        placeholder="Search categories"
        className="mb-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          setSearchValue(value);
          if (value) {
            setExpandedKeys(['root', ...getExpandedKeysForSearch(treeData, value)]);
          }
        }}
        data-testid="search-category-input"
      />
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        className="bg-white"
        showLine={{ showLeafIcon: false }}
        filterAntTreeNode={(node) => {
          const title = (node as unknown as TreeDataNode).title;
          return (
            !!searchValue &&
            !!title &&
            title.toString().toLowerCase().includes(searchValue.toLowerCase())
          );
        }}
        data-testid="product-category-tree"
        onSelect={(selectedKeys, info) => handleSelect(selectedKeys, info)}
      />
    </div>
  );
};

export default ProductCategoryTree;
