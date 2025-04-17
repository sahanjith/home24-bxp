import { Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import HeaderBar from '@/components/HeaderBar';
import ProductCategoryTree from '@/components/ProductCategoryTree';
import { Product } from '@/types';

const { Header, Content } = Layout;

const MainLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [lastModifiedProduct, setLastModifiedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <Layout className="min-h-screen w-full">
        {/* Header */}
        <Header className="bg-white px-4 py-2 shadow-md w-full flex justify-between items-center">
          <HeaderBar lastModifiedProduct={lastModifiedProduct} />
        </Header>
        <Layout className="w-full h-full">
          {/* Left panel */}
          <Layout.Sider width={250} className="bg-white p-4 shadow-inner">
            <ProductCategoryTree onCategorySelect={setSelectedCategory} />
          </Layout.Sider>
          {/* Main content area where child routes get rendered */}
          <Content className="bg-gray-100 p-4 w-full h-full overflow-y-auto">
            <Outlet context={{ selectedCategory, setLastModifiedProduct }} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
