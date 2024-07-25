import React from "react";
import { useTranslation } from "react-i18next";
import { Select as AntdSelect } from "antd";
import { Select as SelectAnt, ConfigProvider, Tag } from "antd";
import ChevronIcon from "@/public/svg/blue-chevron.svg";
import RedCrossIcon from "@/public/svg/red-cross.svg";
import styled from "styled-components";
import { Manrope } from "next/font/google";
import cn from "classnames";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

export function SelectCustom(props: any) {
  const { t } = useTranslation();

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center" }}>
      <p className="text-sm text-gray font-semibold">{t("select.notFound")}</p>
    </div>
  );

  return (
    <ConfigProvider
      renderEmpty={customizeRenderEmpty}
      theme={{
        token: {
          fontFamily: manrope.style.fontFamily,
        },
      }}
    >
      {props.isCustom ? (
        <CustomSelect
          suffixIcon={<ChevronIcon />}
          tagRender={({ label, closable, onClose }) => (
            <Tag
              closable={closable}
              onClose={onClose}
              closeIcon={<RedCrossIcon />}
              className={`borderedSelect flex flex-row items-center gap-1 pl-2 border rounded-lg  border-white-platinum m-1 ${props.className}`}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
                paddingLeft: "8px",
                border: "1px solid #DFE1E6",
                borderRadius: "8px",
                fontSize: "14px",
                margin: "2px",
                backgroundColor: "#fff",
              }}
            >
              <p>{label}</p>
            </Tag>
          )}
          style={{
            width: "100% !important",
            borderRadius: "12px !important",
            border: "1px solid #EAF0F5 !important",
            boxShadow: "0px 0px 4px - 6px #E0EAF199 inset !important",
          }}
          {...props}
        ></CustomSelect>
      ) : (
        <SelectAnt
          className="borderedSelect w-full shadow-inner"
          suffixIcon={<ChevronIcon />}
          variant="borderless"
          tagRender={({ label, closable, onClose }) => (
            <Tag
              closable={closable}
              onClose={onClose}
              className="flex flex-row items-center gap-1 pl-2 border rounded-lg  border-white-platinum m-1"
              closeIcon={<RedCrossIcon />}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
                paddingLeft: "8px",
                border: "1px solid #DFE1E6",
                borderRadius: "8px",
                fontSize: "14px",
                margin: "2px",
                backgroundColor: "#fff",
              }}
            >
              <p>{label}</p>
            </Tag>
          )}
          style={{
            width: "100% !important",
            borderRadius: "12px !important",
            border: "1px solid #EAF0F5 !important",
            boxShadow: "0px 0px 4px - 6px #E0EAF199 inset !important",
          }}
          {...props}
        ></SelectAnt>
      )}
    </ConfigProvider>
  );
}

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
