import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Table, Button, Input, Modal } from 'antd';

import styles from './styles.module.css';
import { routes } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes';

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

  const loading = useSelector((state) => state.orders.loading);

  const order = useSelector((state) => state.orders.productList)

  const onClickRemove = React.useCallback((item) => () => {
    Modal.confirm({
      maskClosable: true,
      okButtonProps: { danger: true },
      title: `Are you sure want to delete product #${item.Id}?`,
      onOk: () => {
        // setState((prevState) => {
        //   const users = JSON.parse(JSON.stringify(prevState.users));

        //   const itemIndex = users.findIndex((x) => x.id === item.id);

        //   users.splice(itemIndex, 1);

        //   return {
        //     ...prevState,
        //     users,
        //   }
        // });
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
      dataIndex: 'id',
      key: 'id',
    },
    {
      // title: 'User_Id',
      // dataIndex: 'id',
      // key: 'id',
    },
    {
      // title: 'Quantity',
      // dataIndex: 'amount',
      // key: 'amount',
    },
    {
      // title: 'Create_At',
      // dataIndex: 'create_At',
      // key: 'create_At',
    },
    {
      // title: 'Update_At',
      // dataIndex: 'update_At',
      // key: 'update_At',
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

  React.useEffect(() => {
    dispatch({ type: ActionTypes.GET_USERS });
  }, [dispatch]);

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
        rowKey="Transaction_Id"
        loading={loading}
        columns={columns}
        // tableLayout="fixed"
        dataSource={order}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}
export default OrderManagePage;