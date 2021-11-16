import React from 'react';
import { Table, Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.css';
import * as ActionTypes from '../../redux/actionTypes';

const UserManagePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.users.loading);

  const users = useSelector((state) => state.users.userList);

  const onClickRemove = React.useCallback((item) => () => {
    Modal.confirm({
      maskClosable: true,
      okButtonProps: { danger: true },
      title: `Are you sure want to delete ${item.username}?`,
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

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    //     address: "null"
    // created_at: null
    // email: "customer"
    // gender: 1
    // id: 1
    // name: "customer"
    // phone: "null"
    // updated_at: null
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Chức năng',
      dataIndex: 'functions',
      key: 'functions',
      render: (text, item) => (
        <Button type="primary" danger onClick={onClickRemove(item)}>Xóa</Button>
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
          placeholder="Tên người dùng"
          onSearch={onSearch}
        />
      </div>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        tableLayout="fixed"
        dataSource={users}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}

export default UserManagePage;
