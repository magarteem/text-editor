import React from "react";
import { Row } from "./ui/Row";
import { ConfigProvider, List } from "antd";

export function Content({ data }: { data: any[] }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorSplit: "#fff",
        },
      }}
    >
      <List
        className="flex flex-col gap-4"
        dataSource={data}
        style={{
          gap: "16px",
        }}
        renderItem={(item, index) => (
          <List.Item>
            <Row isEditable={false} data={item} index={index} />
          </List.Item>
        )}
      ></List>
    </ConfigProvider>
  );
}
