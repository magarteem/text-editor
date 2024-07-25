import React, { ChangeEvent } from "react";
import { Input as AntdInput } from "antd";
import { InputProps as AntInputProps } from "antd/lib/input";
import styled from "styled-components";

interface CustomInputProps {
  isAtAllow?: boolean;
  isError?: boolean;
  isEmail?: boolean;
  isNoValid?: boolean;
  className?: string;
  defaultValue?: string | number | boolean | any;
  onChange?: (value: ChangeEvent<HTMLInputElement> | string) => void;
  isSearch?: boolean;
  isPaste?: boolean;
}

export const Input: React.FC<any> = ({
  isAtAllow = false,
  isError = false,
  isEmail = false,
  isNoValid = false,
  isPaste = false,
  isCopy = false,
  ...rest
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNoValid) return e;

    const { value } = e.currentTarget;
    const validCharsRegex = isEmail
      ? /[a-zA-Z0-9.@!#$%&'*+/=?^_`{|}~-]/
      : /[a-zA-Z0-9\-.@\sА-Яа-яЁё]/;
    if (e.key === " " && value.trim() === "") {
      e.preventDefault();
    } else if (e.key === " ") {
      return;
    } else if (!validCharsRegex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isNoValid) return e;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    let processedData = pastedData;

    if (!isPaste) {
      processedData = pastedData.replace(/\s/g, "");
    }

    let validChars;
    if (isAtAllow) {
      validChars = processedData.replace(
        isEmail
          ? /[^a-zA-Z0-9.@!#$%&'*+/=?^_`{|}~-]/gu
          : /[^a-zA-Z0-9\-.@\sА-Яа-яЁё]/gu,
        ""
      );
    } else {
      validChars = processedData.replace(
        isEmail
          ? /[^a-zA-Z0-9.@!#$%&'*+/=?^_`{|}~-]/gu
          : /[^a-zA-Z0-9\-.\sА-Яа-яЁё]/gu,
        ""
      );
    }

    const { value } = e.currentTarget;
    const caretPosition = e.currentTarget.selectionStart as number;

    if (processedData.trim() === "") {
      return;
    }

    if (
      value.length -
        (e.currentTarget.selectionEnd as number) +
        validChars.length +
        caretPosition <=
      255
    ) {
      const newValue =
        value.substring(0, caretPosition) +
        validChars +
        value.substring(e.currentTarget.selectionEnd as number);
      if (rest.onChange) {
        rest.onChange(newValue);
      }
    }
  };

  return (
    <CustomInput
      {...rest}
      maxLength={255}
      onKeyDown={rest.isSearch ? () => {} : handleKeyDown}
      style={{ ...rest.style }}
      onPaste={handlePaste}
      className={`font-normal borderedSelect ${isError ? "error-border" : ""} ${rest.className}`}
    />
  );
};

const CustomInput = styled(AntdInput)`
  border-radius: 12px;
  border: 1px solid #eaf0f5;
  box-shadow: 0px 0px 2px 0px #99b5c8cc inset !important;
  box-shadow: 0px 0px 4px -6px #e0eaf199 inset !important;
  font-size: 14px;

  &.error-border {
    border-color: red !important;
  }
`;
