import React from 'react';
import { FaBox, FaUserCircle, FaDollarSign, FaShoppingCart } from 'react-icons/fa';

export const sideMenuItems = [
  {
    title: 'Quản lý người dùng',
    path: '/',
    icon: <FaUserCircle />,
  },
  {
    title: 'Quản lý kho',
    path: '/',
    icon: <FaBox />,
  },
  {
    title: 'Quản lý đơn hàng',
    path: '/',
    icon: <FaShoppingCart />,
  },
  {
    title: 'Quản lý doanh thu',
    path: '/',
    icon: <FaDollarSign />,
  },
]