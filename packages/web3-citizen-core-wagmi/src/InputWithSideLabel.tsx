import * as React from 'react';
import classNames from 'classnames';

interface InputWithSideLabelProps {
  className?: string;
  label?: string;
  register: Function;
  required?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
}

export const InputWithSideLabel = ({
  className,
  name,
  label,
  register,
  required = false,
  placeholder,
  type,
}: InputWithSideLabelProps) => {
  const containerClassName = classNames(className, 'InputWithSideLabel flex items-center justify-center');
  return (
    <div className={containerClassName}>
      <input
        className="input col-span-8"
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
      <label className='bg-neutral-300 px-4 rounded-r-lg text-white dark:text-neutral-100 dark:bg-slate-800 self-stretch flex items-center justify-center'>
        <span className="text-sm font-semibold p-2">{label}</span>
      </label>
    </div>
  );
};

export default InputWithSideLabel;
