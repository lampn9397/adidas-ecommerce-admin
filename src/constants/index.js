import React from 'react';
import { FaBox, FaUserCircle, FaDollarSign, FaShoppingCart } from 'react-icons/fa';

import NotFound from '../pages/NotFound';
import UserManagePage from '../pages/UserManagePage';
import OrderManagePage from '../pages/OrderManagePage';
import OrderDetailPage from '../pages/OrderDetailPage';

export const routes = {
  HOME: {
    path: '/',
    exact: true,
    component: UserManagePage
  },
  USERS: {
    path: '/users',
    component: UserManagePage
  },
  ORDERS: {
    path: '/orders',
    exact: true,
    component: OrderManagePage
  },
  ORDER_DETAIL: (orderId = ':orderId') => ({
    path: `/orders/${orderId}`,
    component: OrderDetailPage
  }),
  NOT_FOUND: {
    path: '*',
    component: NotFound,
  }
};

export const sideMenuItems = [
  {
    title: 'Quản lý người dùng',
    path: routes.USERS.path,
    icon: <FaUserCircle />,
  },
  {
    title: 'Quản lý kho',
    path: '/a',
    icon: <FaBox />,
  },
  {
    title: 'Quản lý đơn hàng',
    path: routes.ORDERS.path,
    icon: <FaShoppingCart />,
  },
  {
    title: 'Quản lý doanh thu',
    path: '/b',
    icon: <FaDollarSign />,
  },
];

export const localStorageKey = {
  SIDEBAR_COLLAPSED: 'SIDEBAR_COLLAPSED',
};