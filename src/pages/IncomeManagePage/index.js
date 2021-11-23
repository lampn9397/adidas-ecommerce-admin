import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table } from "antd";
import { Line } from "@ant-design/charts";

import styles from "./styles.module.css";
import * as ActionTypes from "../../redux/actionTypes";
import { formatCurrency } from "../../utils";

const InComeManagePage = () => {
  const dispatch = useDispatch();

  const budget = useSelector((state) => state.budget.budgetList);

  const yearbudget = useSelector((state) => state.budget.yearBudgetList);

  const columns2 = [
    {
      title: "Năm",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Doanh thu",
      dataIndex: "price",
      key: "price",
      render: (text) => formatCurrency(`${text} VNĐ`),
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "product_id",
      render: (_, item, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Doanh số",
      dataIndex: "quantity",
    },
    {
      title: "Doanh thu",
      dataIndex: "price",
      render: (text) => formatCurrency(`${text} VNĐ`),
    },
  ];

  const config = {
    data: yearbudget,
    xField: "year",
    yField: "price",
    point: {
      size: 5,
      shape: "diamond",
    },
    xAxis: { title: { text: "Năm" } },
    yAxis: { title: { text: "Doanh thu" } },
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

      <Card
        title="Danh mục các sản phẩm bán chạy"
        className={(styles.customerDetailCard, styles.cardSeparator)}
      >
        <Table
          rowKey="product_id"
          columns={columns}
          dataSource={budget}
          pagination={{ pageSize: 4 }}
        />
      </Card>
      {
        <Card
          title="Bảng doanh thu theo năm"
          className={(styles.customerDetailCard, styles.cardSeparator)}
        >
          <Table
            rowKey="Id"
            columns={columns2}
            dataSource={yearbudget}
            pagination={{ pageSize: 4 }}
          />
        </Card>
      }
      <Card
        title="Biểu đồ thu nhập theo năm"
        className={styles.customerDetailCard}
      >
        <Line {...config} />
      </Card>
    </div>
  );
};
export default InComeManagePage;
