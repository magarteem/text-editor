import { Block } from "@/app/features/block/Block";
import { GetProfileResponse } from "@api/index";
import { Content } from "@widgets/index";
import { useState, useContext } from "react";
import { UserForm } from "./form/UserForm";
import { EditingBlockContext } from "../editing-block";

export interface Props {
  profile: GetProfileResponse;
  setTab?: (tabName: string) => void;
}
export const BlockUser = ({
  profile,
  id,
  isClient,
  currTab,
}: Props & { id: string; isClient?: boolean; currTab?: string }) => {
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };
  const [user, setUser] = useState(profile);

  return (
    <Block id={"block-user"} isEditable={isEditing}>
      {isEditing ? (
        <UserForm
          profile={user}
          cancel={handleCancel}
          setProfile={setUser}
          isClient={isClient}
        />
      ) : (
        <Content
          currTab={currTab}
          isClient={isClient}
          profile={user}
          isEditable={isEditing}
          edit={handleEdit}
          blockId={editingBlockId}
        />
      )}
    </Block>
  );
};
