import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Table, Button, Input, Modal } from 'antd';

import styles from './styles.module.css';
import { routes } from '../../constants';

export const orders = Array.from({ length: 10 }).fill().map((_, index) => {
  const orderNumber = index + 1;
  return {
    Transaction_Id: `Transaction_${orderNumber}`,
    User_Id: `User_${orderNumber}`,
    User_Name: `Ngô Đức Minh Trí_${orderNumber}`,
    User_Address: `TP.Hue_${orderNumber}`,
    User_Email: `trindm@gmail.com_${orderNumber}`,
    User_Phone: `0123456789_${orderNumber}`,
    Payment: `0123456789_${orderNumber}`,
    Status: 1,
    Amount: 1000,
    Shipping: `SHIPPING_${orderNumber}`,
    Message: `MESSAGE_${orderNumber}`,
    Security: `SECURITY_${orderNumber}`,
    Product_Id: `Product_${orderNumber}`,
    Create_At: `12/11/2021`,
    Update_At: `12/11/2021`,

    Details: Array.from({ length: 10 }).fill().map((_, detailIndex) => {
      const detailNo = detailIndex + 1;
      return {
        Order_Id: detailNo,
        Quantity: 10,
        Price: 100,
        ProductName: `Product name ${detailNo}`,
      };
    })
  };
});

const OrderManagePage = () => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    orders
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

  const onClickDetail = React.useCallback((item) => () => {
    dispatch(push(routes.ORDER_DETAIL(item.Transaction_Id).path));
  }, [dispatch]);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    {
      title: 'Transaction_Id',
      dataIndex: 'Transaction_Id',
      key: 'Transaction_Id',
    },
    {
      title: 'User_Id',
      dataIndex: 'User_Id',
      key: 'User_Id',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
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
          <Button type="primary" className={styles.buttonSeparator} onClick={onClickDetail(item)}>Chi tiết</Button>
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
        columns={columns}
        tableLayout="fixed"
        rowKey="Transaction_Id"
        dataSource={state.orders}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}
export default OrderManagePage;