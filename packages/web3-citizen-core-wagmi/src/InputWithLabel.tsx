import * as React from 'react';
import classNames from 'classnames';

interface InputWithLabelProps {
  className?: string;
  label?: string;
  register: Function;
  required?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
}

export const InputWithLabel = ({
  className,
  name,
  label,
  register,
  required = false,
  placeholder,
  type,
}: InputWithLabelProps) => {
  const containerClassName = classNames(className, 'InputWithLabel');
  return (
    <div className={containerClassName}>
      <label>
        <span className="text-sm font-semibold">{label}</span>
      </label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
    </div>
  );
};

export default InputWithLabel;
