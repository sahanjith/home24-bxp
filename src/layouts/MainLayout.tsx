import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import HeaderBar from '@/components/HeaderBar';
import ProductCategoryTree from '@/components/ProductCategoryTree';
import { useIsMobile } from '@/hooks/useIsMobile';

const { Header, Content } = Layout;

const MainLayout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProductDetailsPage = /^\/product-list\/product\/[^/]+$/.test(location.pathname);

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <Layout className="min-h-screen w-full">
        {/* Header */}
        <Header className="bg-white px-4 py-2 shadow-md w-full flex justify-between items-center">
          <HeaderBar />
        </Header>
        <Layout className="w-full h-full">
          {/* Left panel */}
          {!(isMobile && isProductDetailsPage) && (
            <Layout.Sider width={250} className="bg-white p-4 shadow-inner">
              <ProductCategoryTree />
            </Layout.Sider>
          )}
          {/* Main content area where child routes get rendered */}
          <Content className="bg-gray-100 p-4 w-full h-full overflow-y-auto">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
