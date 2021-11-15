import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Table, Button, Input, Modal } from 'antd';

import styles from './styles.module.css';
import { routes } from '../../constants';

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

  const [state, setState] = React.useState({
    products
  });

  const onClickRemove = React.useCallback((item) => () => {
    Modal.confirm({
      maskClosable: true,
      okButtonProps: { danger: true },
      title: `Are you sure want to delete product #${item.Id}?`,
      onOk: () => {
        setState((prevState) => {
          const products = JSON.parse(JSON.stringify(prevState.products));

          const itemIndex = products.findIndex((x) => x.Id === item.Id);

          products.splice(itemIndex, 1);

          return {
            ...prevState,
            products,
          }
        });
      }
    });
  }, []);

  const onClickEdit = React.useCallback((item) => () => {
    dispatch(push(routes.PRODUCT_DETAIL(item.Id).path));
  }, [dispatch]);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'Image',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
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
        columns={columns}
        dataSource={state.products}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}
export default ProductManagePage;