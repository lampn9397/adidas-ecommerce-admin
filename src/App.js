import React from 'react';
import { Layout } from 'antd';
import { push } from 'connected-react-router';
import { MenuOutlined } from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'antd/dist/antd.css';

import './App.css';
import styles from './App.module.css';

import AppSideBar from './components/AppSideBar';
import UserManagePage from './pages/UserManagePage';

import { history } from './redux/store';
import { sideMenuItems } from './constants';
import * as ActionTypes from './redux/actionTypes';
import OrderManagePage from './pages/OrderManagePage';

const { Content, Header } = Layout;

const App = () => {
  const dispatch = useDispatch();

  const collapsed = useSelector((state) => state.app.collapsed);

  const onClickToggle = React.useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
  }, [dispatch]);

  const onClickMenuItem = React.useCallback((item) => {
    dispatch(push(item.path));
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <Layout className={styles.layoutContainer}>
        {/* LEFT SIDE BAR */}
        <AppSideBar
          collapsed={collapsed}
          sideMenuItems={sideMenuItems}
          onClickMenuItem={onClickMenuItem}
        />

        <Layout className={styles.layoutContainer}>
          <Header className={styles.header}>
            <MenuOutlined
              className={styles.toggleMenuIcon}
              onClick={onClickToggle}
            />
          </Header>
          <Content className={styles.content}>
            <Switch>
              <Route path="/" component={OrderManagePage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </ConnectedRouter>
  );
}

export default App;
