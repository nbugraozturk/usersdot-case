"use client";
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { theme as antdTheme } from 'antd'
import menuItems from './menuItems';

const { Sider } = Layout;

const SidebarMenu = () => {
  const { useToken } = antdTheme
  const { token: theme } = useToken()

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      style={{
        backgroundColor: theme.colorBorder,
        color: theme.colorBg,
      }}
    >
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
      />
    </Sider>
  );
};

export default SidebarMenu;

