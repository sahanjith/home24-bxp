import { List, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Product } from '@/types';
import { handleError } from '@/utils/handleError';

interface ProductListProps {
  selectedCategory: number | null;
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'name' | 'sku'>('name');
  const [pageSize, setPageSize] = useState(5);
  const listRef = useRef<HTMLDivElement>(null);

  const sortProducts = (items: Product[]) => {
    const getField = (product: Product) => {
      if (sortField === 'sku') return product.attributes?.sku || '';
      return product.name || '';
    };

    return [...items].sort((a, b) => {
      const fieldA = String(getField(a)).toLowerCase();
      const fieldB = String(getField(b)).toLowerCase();
      return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/products/${selectedCategory}`);
        const categoryProducts = await res.json();
        setProducts(sortProducts(categoryProducts));
      } catch (error) {
        handleError(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    setProducts((prev) => sortProducts(prev));
  }, [sortOrder, sortField]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageSize]);

  if (loading) return <div>Select a category to view products</div>;

  return (
    <div
      ref={listRef}
      className="bg-white p-6 rounded shadow overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Product List</h2>
      <div className="flex justify-end gap-4 mb-4">
        <div>
          <label htmlFor="sortField" className="mr-2 text-gray-700 self-center">
            Field:
          </label>
          <Select
            id="sortField"
            value={sortField}
            onChange={(value) => setSortField(value)}
            className="w-36"
            options={[
              { label: 'Name', value: 'name' },
              { label: 'SKU', value: 'sku' },
            ]}
          />
        </div>
        <div>
          <label htmlFor="sortOrder" className="mr-2 text-gray-700 self-center">
            Order:
          </label>
          <Select
            id="sortOrder"
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
            className="w-36"
            options={[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
            ]}
          />
        </div>
        <div>
          <label htmlFor="pageSize" className="mr-2 text-gray-700 self-center">
            Items per page:
          </label>
          <Select
            id="pageSize"
            value={pageSize}
            onChange={(value) => setPageSize(value)}
            className="w-36"
            options={[
              { label: '5', value: 5 },
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
            ]}
          />
        </div>
      </div>
      {products.length === 0 ? (
        <div className="text-gray-500 text-center">No products found.</div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={products}
          pagination={{ pageSize }}
          renderItem={(product) => (
            <List.Item
              className="hover:bg-gray-50 px-4 py-3 rounded transition"
              actions={[
                <button
                  key="edit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                  onClick={() => navigate(`product/${product.id}`)}
                >
                  Edit
                </button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img
                    src={product.attributes?.url || 'https://via.placeholder.com/64'}
                    alt={`Image of ${product.name}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                }
                title={<span className="text-gray-800 font-medium">{product.name}</span>}
                description={
                  <span className="text-gray-500 text-sm">{product.attributes?.sku}</span>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ProductList;
