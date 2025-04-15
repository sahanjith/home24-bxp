import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/home24-logo-full.png';
import LastModifiedProduct from '@/components/LastModifiedProduct';
import { Product } from '@/types';

interface HeaderBarProps {
  lastModifiedProduct: Product | null;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ lastModifiedProduct }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Logout',
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="flex-shrink-0">
          <img src={logo} alt="Home24" className="h-8" data-testid="logo-main" />
        </div>
        <div className="flex items-center gap-4">
          {lastModifiedProduct && <LastModifiedProduct lastModifiedProduct={lastModifiedProduct} />}
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) => {
                if (key === 'logout') handleLogout();
              },
            }}
            trigger={['click']}
            data-testid="user-menu"
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar icon={<UserOutlined />} data-testid="user-avatar" />
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
