import { classNames } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes, memo, useEffect, useState } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
}

export const Input: React.FC<InputProps> = memo((props) => {
  const { className, value, onChange, type, placeholder, autoFocus, ...otherProps } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [caretPostition, setCaretPosition] = useState(0);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
    }
  }, [autoFocus]);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };
  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };
  return (
    <div className={classNames(cls.inputWrapper, {}, [className])}>
      {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}
      <div className={cls.caretWrapper}>
        <input
          onSelect={onSelect}
          onBlur={onBlur}
          onFocus={onFocus}
          className={cls.input}
          type={type}
          value={value}
          onChange={onChangeHandler}
          {...otherProps}
        />
        {isFocused && <span style={{ left: `${caretPostition * 10}px` }} className={cls.caret} />}
      </div>
    </div>
  );
});
