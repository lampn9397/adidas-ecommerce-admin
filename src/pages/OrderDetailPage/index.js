import React from 'react';
import { useParams } from 'react-router';
import {
  Card,
  Table,
  // Button,
} from 'antd';

// import AppInput from '../../components/AppInput';

import styles from './styles.module.css';
import { orders } from '../OrderManagePage';

const OrderDetailPage = () => {
  const params = useParams();

  console.log('params > ', params);

  const [state, setState] = React.useState(() => {
    const order = orders.find((x) => x.Transaction_Id === params.orderId);

    return {
      Transaction_Id: order.Transaction_Id,
      User_Id: order.User_Id,
      User_Name: order.User_Name,
      User_Address: order.User_Address,
      User_Email: order.User_Email,
      User_Phone: order.User_Phone,
      Payment: order.Payment,
      Status: order.Status,
      Amount: order.Amount,
      Shipping: order.Shipping,
      Message: order.Message,
      Security: order.Security,
      Product_Id: order.Product_Id,
      Create_At: order.Create_At,
      Update_At: order.Update_At,

      Order_Id: order.Order_Id,
      // Quantity: order.Quantity,

      Details: order.Details,
    }
  });

  // const onChange = React.useCallback((fieldName) => (e) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     [fieldName]: e.target.value,
  //   }));
  // }, []);

  // const onSubmit = React.useCallback(() => {

  // }, []);

  const columns = [
    {
      title: 'Order_Id',
      dataIndex: 'Order_Id',
      key: 'Order_Id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'ProductName',
      key: 'ProductName',
    },
    {
      title: 'Giá',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'Quantity',
      key: 'Quantity',
      render: (text, item) => item.Price * item.Quantity
    },
  ];

  return (
    <div className={styles.container}>
      <Card title="Chi tiết đơn hàng">
        <p>Mã đơn hàng: #{state.Transaction_Id}</p>
        <p>Tên khách hàng: {state.User_Name}</p>
        <p>Địa chỉ: {state.User_Address}</p>
        <p>Số điện thoại: {state.User_Phone}</p>
        <p>Email: {state.User_Email}</p>
      </Card>

      <Table
        columns={columns}
        dataSource={state.Details}
        pagination={{ pageSize: 5 }}
      />

      {/* <AppInput
        bordered
        disabled
        size="large"
        value={state.Order_Id}
        className={styles.input}
        addonBefore={<div className={styles.inputAddonBefore}>Order_Id</div>}
        onChange={onChange('Order_Id')}
      /> */}

      {/* <Button
        type="primary"
        size="large"
        className={styles.submitButton}
        onClick={onSubmit}
      >
        Cập nhật
      </Button> */}
    </div>
  );
}

export default OrderDetailPage;
