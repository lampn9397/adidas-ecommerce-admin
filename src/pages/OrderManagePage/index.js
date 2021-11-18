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

  const orders = useSelector((state) => state.orders.orderList)

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
//     created_at: null
// id: 1
// product: {id: 2, name: 'Giày Adidas Nam Adidas ZX 2K 4D “Triple Black” – Hàng Chính Hãng', category_id: 5, price: 2990000, description: 'MẪU GIÀY CHẠY BỘ TƯƠNG LẠI MANG ĐẬM DẤU ẤN HOÀI CỔ…đến dòng giày ZX lần đầu ra mắt vào thập niên 80.', …}
// product_id: 2
// quantity: 1
// size: 40
// transaction_id: 1
// updated_at: null
    {
      title: 'Mã giao dịch',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
    },
    // {
    //   title: 'User_Id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'],
      // key: 'quantity',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      width: 175,
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_At',
    },
    {
      width: 175,
      title: 'Cập nhật cuối',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      width: 175,
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
    dispatch({ type: ActionTypes.GET_ORDERS });
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
        dataSource={orders}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}
export default OrderManagePage;