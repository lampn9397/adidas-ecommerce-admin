import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const AppInput = ({
  value,
  style,
  onChange,
  className,
  placeholder,
  ...props
}) => (
  <Input
    {...props}
    value={value}
    style={style}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
  />
);

AppInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.instanceOf(Object),
};

AppInput.defaultProps = {
  style: {},
  className: '',
  placeholder: '',
};

export default AppInput;
