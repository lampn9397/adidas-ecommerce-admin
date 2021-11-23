import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Button, Input, Modal } from 'antd';

import styles from './styles.module.css';
import * as ActionTypes from '../../redux/actionTypes';

dayjs.extend(utc)

const CategoryManagePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.categories.loading);

  const categories = useSelector((state) => state.categories.categoryList);

  const deleteLoading = useSelector((state) => state.categories.deleteLoading);

  const modalRef = React.useRef();

  const onClickDelete = React.useCallback((item) => () => {
    const modal = Modal.confirm({
      maskClosable: false,
      okButtonProps: { danger: true },
      title: `Bạn có chắc chắn muốn xóa danh mục ${item.name}?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy bỏ',
      onOk: () => dispatch({ type: ActionTypes.DELETE_CATEGORY, payload: item })
    });

    modalRef.current = modal;
  }, [dispatch]);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    {
      width: 70,
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Danh mục',
      dataIndex: 'name',
    },
    {
      // width: 175,
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      render: (created_at) => dayjs.utc(created_at || undefined).format('HH:mm DD/MM/YYYY')
    },
    {
      width: 120,
      title: 'Chức năng',
      dataIndex: 'functions',
      key: 'functions',
      render: (_, item) => {
        return (
          <Button
            danger
            type="primary"
            onClick={onClickDelete(item)}
          >
            Xóa
          </Button>
        )
      }
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
    dispatch({ type: ActionTypes.GET_CATEGORIES });
  }, [dispatch]);

  const onClickAddCategory = React.useCallback(() => {
    
  }, []);

  const cardExtra = React.useMemo(() => (
    <div className={styles.cardExtra}>
      <Button
        type="primary"
        icon={<AiOutlinePlus />}
        className={styles.addCategoryButton}
        onClick={onClickAddCategory}
      >
        Thêm danh mục
      </Button>

      <div className={styles.searchContainer}>
        <Input.Search
          enterButton
          placeholder="Tìm kiếm danh mục..."
          onSearch={onSearch}
        />
      </div>
    </div>
  ), [onClickAddCategory, onSearch]);

  return (
    <div className={styles.container}>
      <Card
        title="Quản lý sản phẩm"
        extra={cardExtra}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          tableLayout="fixed"
          dataSource={categories}
          pagination={{ pageSize: 7 }}
        />
      </Card>
    </div>
  );
}

export default CategoryManagePage;
