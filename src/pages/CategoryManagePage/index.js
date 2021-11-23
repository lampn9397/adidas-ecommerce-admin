import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Button, Input, Modal, Form, Select } from 'antd';

import styles from './styles.module.css';
import * as ActionTypes from '../../redux/actionTypes';

dayjs.extend(utc)

const CategoryManagePage = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const loading = useSelector((state) => state.categories.loading);

  const categories = useSelector((state) => state.categories.categoryList);

  const addLoading = useSelector((state) => state.categories.addLoading);

  const deleteLoading = useSelector((state) => state.categories.deleteLoading);

  const modalRef = React.useRef();

  const onClickDelete = React.useCallback((item) => () => {
    const modal = Modal.confirm({
      maskClosable: false,
      okButtonProps: { danger: true },
      title: `Bạn có chắc chắn muốn xóa danh mục ${item.name}?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy bỏ',
      onOk: (c) => dispatch({ type: ActionTypes.DELETE_CATEGORY, payload: item })
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

    let loading = addLoading || deleteLoading;

    if (loading) {
      modalRef.current.update({
        okButtonProps: {
          loading,
          disabled: loading,
        },
        cancelButtonProps: {
          disabled: loading
        }
      });
    } else if(modalRef.current) {
      modalRef.current.destroy();

      modalRef.current = null;
      
      form.resetFields();
    }
  }, [deleteLoading, addLoading]);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.GET_CATEGORIES });
  }, [dispatch]);

  const onClickAddCategory = React.useCallback(async () => {
    let modal;

    try {
      const values = await new Promise((resolve, reject) => {
        modal = Modal.confirm({
          title: 'Thêm danh mục',
          onCancel: reject,
          onOk: (c) => {
            form.submit();
          },
          content: (
            <Form
              form={form}
              autoComplete="off"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ categoryName: '', parentCategory: null }}
              style={{ margin: '24px 0 -24px -38px' }}
              onFinish={resolve}
            >
              <Form.Item
                label="Tên danh mục"
                name="categoryName"
                rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Danh mục cha" name="parentCategory">
                <Select placeholder="Chọn thư mục cha">
                  {categories.filter((x) => !x.type).map((c) => (
                    <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          ),
        });

        modalRef.current = modal;
      });

      dispatch({ type: ActionTypes.ADD_CATEGORY, payload: values });
    } catch (error) {
      modal.destroy();
    }
  }, [form, categories, dispatch]);

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
