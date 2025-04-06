import { Tree } from 'antd';

const treeData = [
  {
    title: 'Furniture',
    key: '0',
    children: [
      {
        title: 'Living Room',
        key: '0-0',
        children: [
          { title: 'Sofas', key: '0-0-0' },
          { title: 'Coffee Tables', key: '0-0-1' },
        ],
      },
      {
        title: 'Bedroom',
        key: '0-1',
        children: [
          { title: 'Beds', key: '0-1-0' },
          { title: 'Wardrobes', key: '0-1-1' },
        ],
      },
    ],
  },
  {
    title: 'Decor',
    key: '1',
    children: [
      { title: 'Wall Art', key: '1-0' },
      { title: 'Vases', key: '1-1' },
    ],
  },
];

const ProductCategoryTree = () => {
  return <Tree treeData={treeData} defaultExpandAll className="bg-white" />;
};

export default ProductCategoryTree;
