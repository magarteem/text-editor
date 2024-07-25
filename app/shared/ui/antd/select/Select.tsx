import { Select as AntdSelect, ConfigProvider } from "antd";
import { SelectProps } from "antd/es/select";
import { useTranslation } from "react-i18next";
import ChevronIcon from "@/public/svg/blue-chevron.svg";
import styled from "styled-components";

export const Select = (props: SelectProps) => {
  const { t } = useTranslation();

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center" }}>
      <p className="text-sm text-gray font-semibold">{t("select.notFound")}</p>
    </div>
  );

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <CustomSelect
        {...props}
        className=""
        suffixIcon={<ChevronIcon />}
        placeholder={props.placeholder}
      />
    </ConfigProvider>
  );
};

const CustomSelect = styled(AntdSelect)`
  .ant-select-selector {
    border-color: #eaf0f5 !important;
    border-radius: 12px !important;
    box-shadow: 0px 0px 2px 0px #99b5c8cc inset !important;
    box-shadow: 0px 0px 4px -6px #e0eaf199 inset !important;
    font-size: 14px !important;
    font-weight: 500;
    border-color: rebeccapurple;
    border: none;
  }
  .ant-select-selector:hover {
    border: 1px solid #3b63b8 !important;
  }

  .ant-select-selector:checked {
    border: 1px solid #3b63b8;
  }
`;
