import { Layout } from 'antd';

import HeaderBar from '@/components/HeaderBar';

const { Header, Content } = Layout;

const ProductListPage = () => {
  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <Layout className="min-h-screen w-full">
        {/* Header */}
        <Header className="bg-white px-4 py-2 shadow-md w-full">
          <HeaderBar />
        </Header>

        {/* Main content */}
        <Content className="bg-gray-100 p-4 w-full h-full"></Content>
      </Layout>
    </div>
  );
};

export default ProductListPage;
