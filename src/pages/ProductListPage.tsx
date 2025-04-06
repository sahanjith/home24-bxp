import { Layout } from 'antd';
import { useState } from 'react';

import HeaderBar from '@/components/HeaderBar';
import ProductCategoryTree from '@/components/ProductCategoryTree';
import ProductList from '@/components/ProductList';

const { Header, Content } = Layout;

const ProductListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <Layout className="min-h-screen w-full">
        {/* Header */}
        <Header className="bg-white px-4 py-2 shadow-md w-full">
          <HeaderBar />
        </Header>
        <Layout className="w-full h-full">
          {/* Left panel */}
          <Layout.Sider width={250} className="bg-white p-4 shadow-inner">
            <ProductCategoryTree onCategorySelect={setSelectedCategory} />
          </Layout.Sider>
          {/* Main content */}
          <Content className="bg-gray-100 p-4 w-full h-full overflow-y-auto">
            <ProductList selectedCategory={selectedCategory} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ProductListPage;
