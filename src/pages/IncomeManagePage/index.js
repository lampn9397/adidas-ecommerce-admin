import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table, Button, DatePicker } from "antd";
import { Line } from "@ant-design/charts";

import styles from "./styles.module.css";
import * as ActionTypes from "../../redux/actionTypes";
import { formatCurrency } from "../../utils";

const InComeManagePage = () => {
  const dispatch = useDispatch();

  const budget = useSelector((state) => state.budget.budgetList);

  const yearbudget = useSelector((state) => state.budget.yearBudgetList);

  const [state, setState] = React.useState({
    viewType: 'month',
    yearSelected: new Date().getFullYear()
  });

  const selectYear = React.useCallback((date, dateString) => {
    console.log("sdwd ", date);
    console.log("sdwd ", dateString);
    setState((prevState) => ({
      ...prevState,
      yearSelected: dateString
    }))
    dispatch({
      type: ActionTypes.GET_YEARBUDGET,
      payload: {
        viewType: state.viewType,
        dateString
      }
    });
    // console.log("sdwd ", pay);
  }, [dispatch, state.viewType]);

  const onClickChange = React.useCallback((viewType) => () => {
    console.log("sdwd ", viewType);
    setState((prevState) => ({
      ...prevState,
      viewType
    }))
    dispatch({
      type: ActionTypes.GET_YEARBUDGET,
      payload: {
        viewType,
        dateString: state.yearSelected
      }
    });
    // console.log("sdwd ", pay);
  }, [dispatch, state.yearSelected]);

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
    xField: state.viewType,
    yField: "price",
    point: {
      size: 5,
      shape: "diamond",
    },
    xAxis: { title: { text: state.viewType === 'month' ? "Tháng" : 'Năm' } },
    yAxis: { title: { text: "Doanh thu" } },
  };

  React.useEffect(() => {
    const now = new Date()
    dispatch({ type: ActionTypes.GET_BUDGET });
    dispatch({
      type: ActionTypes.GET_YEARBUDGET,
      payload: {
        dateString: now.getFullYear(),
        viewType: 'month'
      }
    });
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
            rowKey={(record) => `${+record.price}_${Date.now()}`}
            columns={columns2}
            dataSource={yearbudget}
            pagination={{ pageSize: 4 }}
          />
        </Card>
      }
      <Card
        title="Biểu đồ doanh thu theo năm"
        className={styles.customerDetailCard}
        extra={
          <div>
            <DatePicker onChange={selectYear} picker="year" />
            <Button
              type="primary"
              className={styles.buttonSeparator}
              onClick={onClickChange("month")}
            >
              Tháng
            </Button>
            <Button
              type="primary"
              className={styles.buttonSeparator}
              onClick={onClickChange("year")}
            >
              Năm
            </Button>
          </div>
        }
      >
        <Line {...config} />
      </Card>
    </div>
  );
};
export default InComeManagePage;
