import React from 'react';
import { useParams } from 'react-router';
import {
  Card,
  Form,
  Modal,
  Table,
  Button,
  InputNumber,
} from 'antd';
import { FaTrashAlt } from 'react-icons/fa';

import AppInput from '../../components/AppInput';
import EditableCell from '../../components/EditableCell';

import styles from './styles.module.css';
import { formatCurrency } from '../../utils';
import { products } from '../ProductManagePage';


const ProductDetailPage = () => {
  const params = useParams();

  console.log('params > ', params);

  const [state, setState] = React.useState(() => {
    const product = products.find((x) => x.Id === params.productId);

    return {
      Id: product.Id,
      Name: product.Name,
      Price: product.Price,
      Description: product.Description,
      Image: product.Image,
      CreatedAt: product.CreatedAt,
      Sizes: product.Sizes,
    }
  });

  // const onChange = React.useCallback((fieldName) => (e) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     [fieldName]: e.target.value,
  //   }));
  // }, []);

  // const onSubmit = React.useCallback(() => {

  // }, []);

  const onClickRemoveSize = React.useCallback((item) => () => {
    Modal.confirm({
      maskClosable: true,
      okButtonProps: { danger: true },
      title: `Are you sure want to delete product #${item.Id}?`,
      onOk: () => {
        setState((prevState) => {
          const products = JSON.parse(JSON.stringify(prevState.products));

          const itemIndex = products.findIndex((x) => x.Id === item.Id);

          products.splice(itemIndex, 1);

          return {
            ...prevState,
            products,
          }
        });
      }
    });
  }, []);

  const onClickUpdateSize = React.useCallback((item) => () => {
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'Size',
      key: 'Size',
    },
    {
      title: 'Số lượng',
      dataIndex: 'Quantity',
      key: 'Quantity',
      editable: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
    },
    {
      title: 'Chức năng',
      dataIndex: 'functions',
      key: 'functions',
      render: (text, item) => (
        <>
          <Button type="primary" className={styles.buttonSeparator} onClick={onClickUpdateSize(item)}>Cập nhật</Button>
          <Button type="primary" danger onClick={onClickRemoveSize(item)}>Xóa</Button>
        </>
      )
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: true,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });


  const onFinish = React.useCallback((values) => {
    setState((prevState) => ({ ...prevState, ...values }))
  }, []);

  const renderFormItem = React.useCallback((item) => (
    <Form.Item
      key={item.name}
      name={item.name}
      label={item.label}
      rules={item.rules}
      wrapperCol={item.wrapperCol}
    >
      {item.component || <AppInput />}
    </Form.Item>
  ), []);

  const formItems = React.useMemo(() => [
    {
      name: 'Name',
      label: 'Tên sản phẩm',
      rules: [{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]
    },
    {
      name: 'Price',
      label: 'Giá sản phẩm',
      rules: [
        { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
        { type: 'number', message: 'Giá sản phẩm không hợp lệ!' },
      ],
      component: (
        <InputNumber
          className={styles.priceInput}
          parser={value => {
            // const valueWithoutCurrency = value.replace(' VNĐ', '');
            // const valueWithoutSeparator = valueWithoutCurrency.replace(/,/g, '').trim();
            return value.replace(/\D/g, '').trim();
          }}
          formatter={(value) => formatCurrency(`${value} VNĐ`)} />
      )
    },
    {
      name: 'Image',
      label: 'Hình ảnh',
      rules: [{ required: true, message: 'Vui lòng nhập hình ảnh!' }]
    },
    {
      name: 'Description',
      label: 'Mô tả',
      rules: [{ max: 300, message: 'Mô tả quá dài!' }]
    },
    {
      wrapperCol: {
        offset: 5,
        span: 10,
      },
      component: (
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      )
    },
  ], []);

  const onSizeTableFormFinish = React.useCallback((values) => {
    console.log("🚀 ~ file: index.js ~ line 186 ~ onSizeTableFormFinish ~ values", values)
  }, []);

  const onClickRemoveProduct = React.useCallback(() => {
    Modal.confirm({
      maskClosable: true,
      okButtonProps: { danger: true },
      title: `Are you sure want to delete product ${state.Name}?`,
      onOk: () => {

      }
    });
  }, [state.Name]);

  return (
    <div className={styles.container}>
      <Card
        title={`Sản phẩm: ${state.Name}`}
        extra={<Button danger icon={<FaTrashAlt />} />}
        onClick={onClickRemoveProduct}
      >
        <Form
          name="product-form"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 10 }}
          initialValues={state}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {formItems.map(renderFormItem)}
        </Form>
      </Card>

      <Card title="Size của sản phẩm:" className={styles.tableContainer}>
        <Form
          name="size-table-form"
          onFinish={onSizeTableFormFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={state.Sizes}
        >
          <Table
            rowKey="Id"
            columns={mergedColumns}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            tableLayout="fixed"
            dataSource={state.Sizes}
            pagination={{ pageSize: 5 }}
          />
        </Form>
      </Card>
    </div>
  );
}

export default ProductDetailPage;
