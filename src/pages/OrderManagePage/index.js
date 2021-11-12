import React from 'react';
import { Table, Button, Input, Modal } from 'antd';

import styles from './styles.module.css';

const OrderManagePage = () => {
  const [state, setState] = React.useState({
    orders: [
      { Order_Id: 1, User_Id: 'A', Transaction_Id: 'A', Product_Id: 'A', Quanlity: 'A', Create_At: 'A', Update_At: 'A' },
      { Order_Id: 2, User_Id: 'A', Transaction_Id: 'B', Product_Id: 'B', Quanlity: 'B', Create_At: 'B', Update_At: 'B' },
      { Order_Id: 3, User_Id: 'A', Transaction_Id: 'C', Product_Id: 'C', Quanlity: 'C', Create_At: 'C', Update_At: 'C' },
      { Order_Id: 4, User_Id: 'A', Transaction_Id: 'D', Product_Id: 'D', Quanlity: 'D', Create_At: 'D', Update_At: 'D' },
      { Order_Id: 5, User_Id: 'A', Transaction_Id: 'E', Product_Id: 'E', Quanlity: 'E', Create_At: 'E', Update_At: 'E' },
      { Order_Id: 6, User_Id: 'A', Transaction_Id: 'F', Product_Id: 'F', Quanlity: 'F', Create_At: 'F', Update_At: 'F' },
      { Order_Id: 7, User_Id: 'A', Transaction_Id: 'G', Product_Id: 'G', Quanlity: 'G', Create_At: 'G', Update_At: 'G' },
    ]
  });

  const onClickRemove = React.useCallback((item) => () => {
    Modal.confirm({
      maskClosable: true,
      okButtonProps: { danger: true },
      title: `Are you sure want to delete order #${item.Order_Id}?`,
      onOk: () => {
        setState((prevState) => {
          const orders = JSON.parse(JSON.stringify(prevState.orders));

          const itemIndex = orders.findIndex((x) => x.Order_Id === item.Order_Id);

          orders.splice(itemIndex, 1);

          return {
            ...prevState,
            orders,
          }
        });
      }
    });
  }, []);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    {
      title: 'Order_Id',
      dataIndex: 'Order_Id',
      key: 'Order_Id',
    },
    {
      title: 'User_Id',
      dataIndex: 'User_Id',
      key: 'User_Id',
    },
    {
      title: 'Transaction_Id',
      dataIndex: 'Transaction_Id',
      key: 'Transaction_Id',
    },
    {
      title: 'Product_Id',
      dataIndex: 'Product_Id',
      key: 'Product_Id',
    },
    {
      title: 'Quanlity',
      dataIndex: 'Quanlity',
      key: 'Quanlity',
    },
    {
      title: 'Create_At',
      dataIndex: 'Create_At',
      key: 'Create_At',
    },
    {
      title: 'Update_At',
      dataIndex: 'Update_At',
      key: 'Update_At',
    },
    {
      title: 'Chức năng',
      dataIndex: 'functions',
      key: 'functions',
      render: (text, item) => (
        <div>
          <Button type="primary" className={styles.buttonSeparator}>Chi tiết</Button>
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
          placeholder="Mã đơn hàng"
          onSearch={onSearch}
        />
      </div>

      <Table
        dataSource={state.orders}
        columns={columns}
      />
    </div>
  );
}
export default OrderManagePage;