import React from "react";
import { Block } from "@/app/features/block/Block";
import { Label } from "../block-user";

export const Employees = () => {
  return (
    <Block isEditable={false} classNames="flex-grow flex-shrink-1 basis-full">
      <div>
        <Label>employees</Label>
        <h2>Екатерина Кушнир</h2>
      </div>
      <div>
        <Label>Фото</Label>
        <h2>Екатерина Кушнир</h2>
      </div>
      <div>
        <Label>О себе</Label>
        <h2>Екатерина Кушнир</h2>
      </div>
    </Block>
  );
};
