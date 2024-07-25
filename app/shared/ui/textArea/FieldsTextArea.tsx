import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import styled from "styled-components";

const { TextArea } = Input;

type Props = { classNames?: string } & TextAreaProps;

export const FieldsTextArea = ({ classNames, ...props }: Props) => {
  return <CustomTextArea className={classNames} {...props} />;
};

const CustomTextArea = styled(TextArea)`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.xxl} !important;
  padding-right: 40px;
`;
