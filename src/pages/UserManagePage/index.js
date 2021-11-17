import React from 'react';
import { Table, Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.css';
import * as ActionTypes from '../../redux/actionTypes';

const UserManagePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.users.loading);

  const users = useSelector((state) => state.users.userList);

  const deleteLoading = useSelector((state) => state.users.deleteLoading);

  const modalRef = React.useRef();

  const onClickRemove = React.useCallback((item) => () => {
    const modal = Modal.confirm({
      maskClosable: false,
      okButtonProps: { danger: true },
      title: `Bạn có chắc chắn muốn xóa tài khoản ${item.email}?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy bỏ',
      onOk: () => dispatch({ type: ActionTypes.DELETE_USER, payload: item })
    });

    modalRef.current = modal;
  }, [dispatch]);

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
      title: 'Họ Tên',
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
    if (!modalRef.current) return;
  
    if (deleteLoading) {
      modalRef.current.update({
        okButtonProps: {
          loading: deleteLoading,
          disabled: deleteLoading,
        },
        cancelButtonProps: {
          disabled: deleteLoading
        }
      });
    } else {
      modalRef.current.destroy();
    }
  }, [deleteLoading]);

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
