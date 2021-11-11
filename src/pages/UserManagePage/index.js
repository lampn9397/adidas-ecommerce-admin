import React from 'react';
import { Table, Button, Input } from 'antd';

import styles from './styles.module.css';

const UserManagePage = () => {
  const [state, setState] = React.useState({
    users: [
      { id: 1, username: 'A', fullname: 'A', address: 'A', email: 'A' },
      { id: 2, username: 'B', fullname: 'B', address: 'B', email: 'B' },
      { id: 3, username: 'C', fullname: 'C', address: 'C', email: 'C' },
      { id: 4, username: 'D', fullname: 'D', address: 'D', email: 'D' },
      { id: 5, username: 'E', fullname: 'E', address: 'E', email: 'E' },
      { id: 6, username: 'F', fullname: 'F', address: 'F', email: 'F' },
      { id: 7, username: 'G', fullname: 'G', address: 'G', email: 'G' },
    ]
  });

  const onClickRemove = React.useCallback((item) => () => {
  }, []);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
        dataSource={state.users}
        columns={columns}
      />
    </div>
  );
}

export default UserManagePage;
