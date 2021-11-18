import React from 'react';
import { push } from 'connected-react-router';
import { Table, Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.css';
import { routes } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes';

export const products = Array.from({ length: 10 }).fill().map((_, index) => {
  const productNumber = index + 1;
  return {
    Id: `${productNumber}`,
    Name: `Product #${productNumber}`,
    Price: 1000,
    Description: `Product #${productNumber} description`,
    Image: `Product #${productNumber} image`,
    CreatedAt: '20:32 15/11/2021',
    Sizes: [
      { Id: 1, Size: 41, Quantity: 10, CreatedAt: '20:32 15/11/2021' },
      { Id: 2, Size: 42, Quantity: 10, CreatedAt: '20:32 16/11/2021' },
      { Id: 3, Size: 43, Quantity: 10, CreatedAt: '20:32 17/11/2021' },
    ]
  };
});

const ProductManagePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.loading);

  const products = useSelector((state) => state.products.productList)

  const deleteLoading = useSelector((state) => state.products.deleteLoading);

  const modalRef = React.useRef();

  const onClickRemove = React.useCallback((item) => () => {
    const modal = Modal.confirm({
      maskClosable: false,
      okButtonProps: { danger: true },
      title: `Bạn có chắc chắn muốn xóa tài khoản ${item.email}?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy bỏ',
      onOk: () => dispatch({ type: ActionTypes.DELETE_PRODUCTS, payload: item })
    });

    modalRef.current = modal;
  }, [dispatch]);

  const onClickEdit = React.useCallback((item) => () => {
    dispatch(push(routes.PRODUCT_DETAIL(item.Id).path));
  }, [dispatch]);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Chức năng',
      dataIndex: 'functions',
      key: 'functions',
      render: (text, item) => (
        <div>
          <Button type="primary" className={styles.buttonSeparator} onClick={onClickEdit(item)}>Chỉnh sửa</Button>
          <Button type="primary" danger onClick={onClickRemove(item)}>Xóa</Button>
        </div>
      )
    },
  ];

  React.useEffect(() => {
    if (!modalRef.current) return;
  
    if (deleteLoading) {
      modalRef.current.update({
        okButtonProps: {
          loading: deleteLoading,
          disabled: deleteLoading,
        },
        cancelButtonProps: {
          disabled: deleteLoading
        }
      });
    } else {
      modalRef.current.destroy();
    }
  }, [deleteLoading]);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.GET_PRODUCTS });
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input.Search
          enterButton
          placeholder="Tìm kiếm sản phẩm"
          onSearch={onSearch}
        />
      </div>

      <Table
        rowKey="Id"
        loading={loading}
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}
export default ProductManagePage;