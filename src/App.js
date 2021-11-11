import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';

import 'antd/dist/antd.css';

import './App.css';
import styles from './App.module.css';

import UserManagePage from './pages/UserManagePage';

// import { history } from './redux/store';
import { sideMenuItems } from './constants';

const { Content, Sider } = Layout;

const App = () => {
  const [state, setState] = React.useState({
    collapsed: false,
  });

  const onCollapse = React.useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  }, []);
  // abc
  const renderMenuItem = React.useCallback((item) => (
    <Menu.Item key={item.title} icon={item.icon}>
      {item.title}
    </Menu.Item>
  ), []);

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
        <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
          <div className={styles.logoContainer}>
            <Avatar size={state.collapsed ? 36 : 128} src="https://picsum.photos/200" />
            {!state.collapsed && <Typography.Title level={4} className={styles.username}>Ngô Đức Minh Trí</Typography.Title>}
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {sideMenuItems.map(renderMenuItem)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content>
            <Switch>
              <Route path="/" component={UserManagePage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
