'use client';
import { ConfigProvider, Layout } from 'antd';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import theme from '../../../theme';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh', backgroundColor: theme.token.colorBgLayout }}>
        {/* Sol menü */}
        <SidebarMenu />

        {/* Sayfa içeriği */}
        <Layout>
          <Header style={{ backgroundColor: theme.token.colorBg, fontSize: '3vh' }}>
            <h1>User Management</h1>
          </Header>

          <Content style={{ padding: '20px', backgroundColor: theme.token.colorBg }}>
            {children}
          </Content>

          <Footer style={{ textAlign: 'right', backgroundColor: theme.token.colorBgLayout, color: theme.token.colorText }}>
            Application Footer
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
