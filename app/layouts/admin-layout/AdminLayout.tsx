import { LeftSidebar } from "@widgets/index";
import { PropsWithChildren } from "react";
import { useMainSidebarItems } from "@const/index";
import { Content, Main } from "@ui/index";

export const AdminLayout = ({ children }: PropsWithChildren) => {
  const mainSidebarItems = useMainSidebarItems();
  return (
    <Main>
      <LeftSidebar items={mainSidebarItems} />
      <Content>{children}</Content>
    </Main>
  );
};
