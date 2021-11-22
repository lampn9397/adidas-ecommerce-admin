import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Table, Button, Input, Modal, Image } from 'antd';
import { Line } from '@ant-design/charts';

import styles from './styles.module.css';
import { routes } from '../../constants';
import * as ActionTypes from '../../redux/actionTypes';

const InComeManagePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.budget.loading);

  const budget = useSelector((state) => state.budget.budgetList);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns2 = [
    {
      title: 'Transaction_Id',
      dataIndex: 'Transaction_Id',
      key: 'Transaction_Id',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },

  ];

  const columns = [
    {
      title: 'Product_Id',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thu Nhập',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },

  ];

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  React.useEffect(() => {
    dispatch({ type: ActionTypes.GET_BUDGET });
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
        columns={columns}
        dataSource={budget}
        pagination={{ pageSize: 4 }}
      />

     {/* <Table
        rowKey="Id"
        columns={columns2}
        dataSource={state.income}
        pagination={{ pageSize: 4 }}
      /> */}
      <Line {...config} />;
    </div>
    
  );
}
export default InComeManagePage;