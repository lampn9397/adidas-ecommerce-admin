import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Table, Button, Input, Modal, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.css';
import { formatCurrency } from '../../utils';
import * as ActionTypes from '../../redux/actionTypes';

dayjs.extend(utc)

const ProductManagePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.loading);

  const products = useSelector((state) => state.products.productList)

  const deleteLoading = useSelector((state) => state.products.deleteLoading);

  const modalRef = React.useRef();

  const onClickRemove = React.useCallback((item) => () => {
    const modal = Modal.confirm({
      maskClosable: false,
      okButtonProps: { danger: true },
      title: `Bạn có chắc chắn muốn xóa sản phẩm ${item.name}?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy bỏ',
      onOk: () => dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: item })
    });

    modalRef.current = modal;
  }, [dispatch]);

  const onClickEdit = React.useCallback((item) => () => {
    // dispatch(push(routes.PRODUCT_DETAIL(item.Id).path));
    dispatch({ type: ActionTypes.SELECT_PRODUCT, payload: item });
  }, [dispatch]);

  const onSearch = React.useCallback((text) => {

  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      width: 200,
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => formatCurrency(`${text} VNĐ`)
    },
    // {
    //   title: 'Mô tả',
    //   dataIndex: 'Description',
    //   key: 'Description',
    // },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (imageSource) => <Image src={imageSource} width={100} />
    },
    {
      width: 175,
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => dayjs.utc(text || undefined).format('HH:mm DD/MM/YYYY')
    },
    {
      width: 200,
      title: 'Chức năng',
      dataIndex: 'functions',
      key: 'functions',
      render: (text, item) => (
        <div>
          <Button type="primary" className={styles.buttonSeparator} onClick={onClickEdit(item)}>Chỉnh sửa</Button>
          <Button type="primary" danger onClick={onClickRemove(item)}>Xóa</Button>
        </div>
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
    dispatch({ type: ActionTypes.GET_PRODUCTS });
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
        loading={loading}
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}
export default ProductManagePage;