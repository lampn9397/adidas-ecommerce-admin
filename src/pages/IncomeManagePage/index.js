import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { Line } from '@ant-design/charts';

import styles from './styles.module.css';
import * as ActionTypes from '../../redux/actionTypes';

const InComeManagePage = () => {
  const dispatch = useDispatch();

  // const loading = useSelector((state) => state.budget.loading);

  const budget = useSelector((state) => state.budget.budgetList);

  const yearbudget = useSelector((state) => state.budget.yearbudgetList);

  const columns2 = [
    // {
    //   title: 'Transaction_Id',
    //   dataIndex: 'Transaction_Id',
    //   key: 'Transaction_Id',
    // },
    {
      title: 'Năm',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'price',
      key: 'price',
    },

  ];

  const columns = [
    {
      title: 'No.',
      dataIndex: 'product_id',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Doanh số',
      dataIndex: 'quantity',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'price',
      render: (price) => `${price} VNĐ`
    },
  ];

  // const data = [
  //   { Năm: '1991', value: 3 },
  //   { Năm: '1992', value: 4 },
  //   { Năm: '1993', value: 3.5 },
  //   { Năm: '1994', value: 5 },
  //   { Năm: '1995', value: 4.9 },
  //   { Năm: '1996', value: 6 },
  //   { Năm: '1997', value: 7 },
  //   { Năm: '1998', value: 9 },
  //   { Năm: '1999', value: 13 },
  // ];

  const data = yearbudget;

  const config = {
    data,
    xField: 'year',
    yField: 'price',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  React.useEffect(() => {
    dispatch({ type: ActionTypes.GET_BUDGET });
  }, [dispatch]);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.GET_YEARBUDGET });
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.searchContainer}>
        <Input.Search
          enterButton
          placeholder="Tìm kiếm sản phẩm"
          onSearch={onSearch}
        />
      </div> */}

      <Table
        rowKey="product_id"
        columns={columns}
        dataSource={budget}
        pagination={{ pageSize: 4 }}
      />

      { <Table
        rowKey="Id"
        columns={columns2}
        dataSource={yearbudget}
        pagination={{ pageSize: 4 }}
      /> }
      <Line {...config} />
    </div>

  );
}
export default InComeManagePage;