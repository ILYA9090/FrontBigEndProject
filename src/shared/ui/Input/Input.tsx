import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes, memo, useEffect, useState } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
}

export const Input: React.FC<InputProps> = memo((props) => {
  const { className, onKeyDown, value, onChange, type, placeholder, readonly, autoFocus, ...otherProps } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [caretPostition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;
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

  const mods: Mods = {
    [cls.readOnly]: readonly,
  };
  return (
    <div className={classNames(cls.inputWrapper, mods, [className])}>
      {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}
      <div className={cls.caretWrapper}>
        <input
          onKeyDown={onKeyDown}
          readOnly={readonly}
          onSelect={onSelect}
          onBlur={onBlur}
          onFocus={onFocus}
          className={cls.input}
          type={type}
          value={value}
          onChange={onChangeHandler}
          {...otherProps}
        />
        {isCaretVisible && <span style={{ left: `${caretPostition * 10}px` }} className={cls.caret} />}
      </div>
    </div>
  );
});
