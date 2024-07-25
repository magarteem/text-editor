import { PropsWithChildren } from "react";
import { Manrope } from "next/font/google";
import { SyncActiveOrganizations } from "@/app/features/sync-active-organizations/SyncActiveOrganizations";
import StyledComponentsRegistry from "@/lib/styled-components";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { colors } from "@/lib/theme/const/colors";
import { ThemeConfig } from "antd";
import { ConfigProvider } from "antd";
import cn from "classnames";
import "./global.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

const themeConfig: ThemeConfig = {
  token: {
    fontFamily: manrope.style.fontFamily,
  },
  components: {
    Switch: {
      trackHeight: 24,
      handleSize: 20,

      algorithm: true,
    },
    Table: {
      headerBg: "#fff",
      headerSplitColor: "#fff",
      rowHoverBg: "#F4FAFF",
    },
    Pagination: {
      itemActiveBg: "#ECF7FF",
    },
    InputNumber: {
      controlWidth: 86,
      handleBorderColor: "#fff",
      handleBg: "#00000000",
    },
    Layout: {
      colorBgLayout: colors.background,
      siderBg: colors.background,
      triggerBg: colors.background,

      algorithm: true,
    },
    Menu: {
      colorPrimaryBg: colors.blueLight,
      colorPrimary: colors.blackNotSo,
      colorText: colors.gray,
      colorBgContainer: "transparent",
      colorBgBase: "transparent",
      colorBorderSecondary: colors.background,

      algorithm: true,
    },
  },
};

interface Props {}
export default function RootLayout(props: PropsWithChildren<Props>) {
  const { children } = props;
  const { sessionClaims } = auth();

  return (
    <ClerkProvider>
      <SyncActiveOrganizations membership={sessionClaims?.membership} />
      <html>
        <body className={cn(manrope.className, "bg-background")}>
          <StyledComponentsRegistry>
            <AntdRegistry>
              <ConfigProvider theme={themeConfig} wave={{ disabled: true }}>
                {children}
              </ConfigProvider>
            </AntdRegistry>
          </StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
