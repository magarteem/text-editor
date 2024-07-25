"use client";
import { useState, useContext } from "react";
import { Block } from "@/app/features/block/Block";
import { Props } from "../block-user";
import { Header } from "./ui";
import { FormEducation } from "./FormEducation";
import { EditingBlockContext } from "../editing-block";
import { Content } from "./Content";

export const BlockEducation = ({ profile, id }: Props & { id: string }) => {
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };
  const [educationDetails, setEducationDetails] = useState(
    profile.educationDetails
  );

  return (
    <Block id={"block-education"} isEditable={false} classNames="px-0">
      <Header
        isEditable={editingBlockId != null}
        isEmpty={!!!educationDetails.length}
        edit={handleEdit}
      />
      {isEditing ? (
        <FormEducation
          data={educationDetails}
          id={profile.id}
          setData={setEducationDetails}
          cancel={handleCancel}
        />
      ) : (
        !!educationDetails.length && <Content data={educationDetails} />
      )}
    </Block>
  );
};
