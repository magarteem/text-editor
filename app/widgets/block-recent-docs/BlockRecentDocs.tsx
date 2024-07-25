import React, { useEffect } from "react";
import { Props } from "../block-user";
import { Block } from "@/app/features/block/Block";
import { Footer, Header, Table } from "./components";
import { useTableData } from "./components/table/useTableData";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";

export const BlockRecentDocs = ({ profile, setTab }: Props) => {
  const { dataSource, loading, fetchRecords } = useTableData();
  const userProfile = useStore(useProfileStore);

  useEffect(() => {
    fetchRecords({ ownerId: profile.id });
  }, []);

  if (userProfile?.roleType === "Client" && dataSource.length === 0) {
    return null;
  }

  return (
    <Block isEditable={false} id="s" classNames={"px-0"}>
      <Header
        isEmpty={dataSource.length === 0}
        setTab={(id) => {
          const element = document.getElementById(id);
          element?.click();
          document
            .getElementById("clientName")
            ?.scrollIntoView({ behavior: "smooth", block: "end" });
        }}
      />
      {dataSource.length >= 1 && (
        <>
          <Table dataSource={dataSource} />
          <Footer
            setTab={(id) => {
              const element = document.getElementById(id);
              element?.click();
              document
                .getElementById("clientName")
                ?.scrollIntoView({ behavior: "smooth", block: "end" });
            }}
          />
        </>
      )}
    </Block>
  );
};
