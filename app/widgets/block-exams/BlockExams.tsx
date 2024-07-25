"use client";
import { useState, useContext } from "react";
import { Block } from "@/app/features/block/Block";
import { Header } from "./ui";
import { Props } from "../block-user";
import { FormExams } from "./FormExams";
import { Content } from "./Content";
import { EditingBlockContext } from "../editing-block";

export const BlockExams = ({ profile, id }: Props & { id: string }) => {
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };
  const [exams, setExams] = useState(profile.examDetails);

  return (
    <Block id={"block-exams"} isEditable={false} classNames="px-0">
      <Header
        isEditable={editingBlockId != null}
        edit={handleEdit}
        isEmpty={!!!exams.length}
      />
      {isEditing ? (
        <FormExams
          data={exams}
          id={profile.id}
          setData={setExams}
          cancel={handleCancel}
        />
      ) : (
        exams.length >= 1 && <Content data={exams} />
      )}
    </Block>
  );
};
