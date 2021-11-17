import React from 'react';
import axios from 'axios';
import { FaBox, FaUserCircle, FaDollarSign, FaShoppingCart } from 'react-icons/fa';

import NotFound from '../pages/NotFound';
import UserManagePage from '../pages/UserManagePage';
import OrderManagePage from '../pages/OrderManagePage';
import OrderDetailPage from '../pages/OrderDetailPage';
import ProductManagePage from '../pages/ProductManagePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import InComeManagePage from '../pages/IncomeManagePage';

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
  PRODUCTS: {
    path: '/products',
    exact: true,
    component: ProductManagePage
  },
  PRODUCT_DETAIL: (productId = ':productId') => ({
    path: `/products/${productId}`,
    component: ProductDetailPage
  }),
  INCOME: {
    path: '/income',
    component: InComeManagePage,
  },
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
    path: routes.PRODUCTS.path,
    icon: <FaBox />,
  },
  {
    title: 'Quản lý đơn hàng',
    path: routes.ORDERS.path,
    icon: <FaShoppingCart />,
  },
  {
    title: 'Quản lý doanh thu',
    path: routes.INCOME.path,
    icon: <FaDollarSign />,
  },
];

export const localStorageKey = {
  SIDEBAR_COLLAPSED: 'SIDEBAR_COLLAPSED',
};

export const responseStatus = {
  OK: 'OK', // Success
  NG: 'NG', // Failed
};

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpLWFkbWluXC9sb2dpbiIsImlhdCI6MTYzNzE1MjEzMywiZXhwIjoxNjM3MTU1NzMzLCJuYmYiOjE2MzcxNTIxMzMsImp0aSI6InJMVFRnTzNZNk1hUzVTWGUiLCJzdWIiOjEsInBydiI6ImMxYjhlZmJmODJlNjgzOWFlMzdkZTE4OTIzMWQxODE5NDUyY2RmZTkifQ.FJIdmVXCwpoyqbVNtGNxQEG3DZdcDuI3hT8MXdKHIrs';

export const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api-admin',
  headers: {
    Authorization: `Bearer ${token}`,
  }
});