"use client";

import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "@/lib/styled-components";
import { ThemeProvider } from "@providers/index";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import { colors } from "@/lib/theme/const/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const themeConfig: ThemeConfig = {
  components: {
    Switch: {
      trackHeight: 24,
      handleSize: 20,

      algorithm: true,
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
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const OtherProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>
        <AntdRegistry>
          <ConfigProvider theme={themeConfig} wave={{ disabled: true }}>
            <ThemeProvider>{children}</ThemeProvider>
          </ConfigProvider>
        </AntdRegistry>
      </StyledComponentsRegistry>
    </QueryClientProvider>
  );
};
