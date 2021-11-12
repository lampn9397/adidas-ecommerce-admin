import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Typography } from 'antd';

import styles from './styles.module.css';

const { Sider } = Layout;

const AppSideBar = ({ collapsed, sideMenuItems, onClickMenuItem: onClickMenuItemProps }) => {
  const onClickMenuItem = React.useCallback((item) => () => {
    onClickMenuItemProps(item);
  }, [onClickMenuItemProps]);

  const renderMenuItem = React.useCallback((item) => (
    <Menu.Item key={item.title} icon={item.icon} onClick={onClickMenuItem(item)}>
      {item.title}
    </Menu.Item>
  ), [onClickMenuItem]);

  return (
    <Sider collapsible collapsed={collapsed} trigger={null}>
      <div className={styles.logoContainer}>
        <Avatar size={collapsed ? 36 : 128} src="https://picsum.photos/200" />
        {!collapsed && <Typography.Title level={4} className={styles.username}>Ngô Đức Minh Trí</Typography.Title>}
      </div>

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {sideMenuItems.map(renderMenuItem)}
      </Menu>
    </Sider>
  );
}

AppSideBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  sideMenuItems: PropTypes.instanceOf(Array).isRequired,
}

export default AppSideBar;
