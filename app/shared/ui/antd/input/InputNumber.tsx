import { InputNumber as AntdInputNumber, InputNumberProps } from "antd";
import { forwardRef } from "react";
import DownChevronIcon from "@/public/svg/chevron-down.svg";
import TopChevronIcon from "@/public/svg/chevron-top.svg";

interface CustomInputNumberProps extends InputNumberProps {
  max?: number;
  min?: number;
}

export const InputNumber = forwardRef<HTMLInputElement, CustomInputNumberProps>(
  (props, ref) => {
    const { max, min, ...restProps } = props;

    return (
      <AntdInputNumber
        className="borderedSelect"
        controls={{
          upIcon: <TopChevronIcon />,
          downIcon: <DownChevronIcon />,
        }}
        max={max}
        min={min}
        ref={ref}
        {...restProps}
      />
    );
  }
);
