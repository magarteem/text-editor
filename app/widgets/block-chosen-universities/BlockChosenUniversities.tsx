import React, { useState, useContext } from "react";
import { Block } from "@/app/features/block/Block";
import { Props } from "../block-user";
import { Header } from "./ui";
import { Content } from "./Content";
import { FormChosenUniversities } from "./FormChosenUniversities";
import { EditingBlockContext } from "../editing-block";

export const BlockChosenUniversities = ({
  profile,
  id,
  isClient,
}: Props & { id: string; isClient?: boolean }) => {
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };
  const [chosenUniversities, setChosenUniversities] = useState(
    profile.targetDetailsUniversity
  );

  return (
    <Block isEditable={false} id={"ChosenUniversities"}>
      <Header
        isEditable={editingBlockId != null}
        isClient={isClient}
        edit={handleEdit}
        cancel={handleCancel}
        isEmpty={!!!chosenUniversities.length}
      />
      {isEditing ? (
        <FormChosenUniversities
          data={chosenUniversities}
          id={profile.id}
          setData={setChosenUniversities}
          cancel={handleCancel}
        />
      ) : (
        chosenUniversities.length >= 1 && <Content data={chosenUniversities} />
      )}
    </Block>
  );
};
