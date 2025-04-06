import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/home24-logo-full.png';

const HeaderBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'logout') handleLogout();
      }}
      items={[
        {
          key: 'logout',
          label: 'Logout',
        },
      ]}
    />
  );

  return (
    <div className="flex items-center justify-between w-full">
      <img src={logo} alt="Home24" className="h-8" />
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderBar;
