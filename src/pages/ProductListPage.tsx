import { Layout } from 'antd';

import HeaderBar from '@/components/HeaderBar';
import ProductCategoryTree from '@/components/ProductCategoryTree';

const { Header, Content } = Layout;

const ProductListPage = () => {
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
            <ProductCategoryTree />
          </Layout.Sider>
          {/* Main content */}
          <Content className="bg-gray-100 p-4 w-full h-full"></Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ProductListPage;
