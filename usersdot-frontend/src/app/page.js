"use client";

import { Space } from 'antd';
import UsersTable from './components/UsersTable';
import AppLayout from './components/AppLayout';

const HomePage = () => {
  return (
    <AppLayout>
      <Space direction="vertical" size="middle" style={{ width: '100%', padding: '20px' }}>
        <UsersTable />
      </Space>
    </AppLayout>
  );
};

export default HomePage;
