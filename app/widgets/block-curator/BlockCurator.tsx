import React, { useState, useContext } from "react";
import { Props } from "../block-user";
import { Block } from "@/app/features/block/Block";
import { Body, Header } from "./ui";
import { FormCurator } from "./FormCurator";
import { useStore } from "zustand";
import { EditingBlockContext } from "../editing-block";
import { useProfileStore } from "@store/index";

export const BlockCurator = ({ profile, id }: Props & { id: string }) => {
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };

  const userProfile = useStore(useProfileStore);
  const [curator, setCurator] = useState(
    profile.curator?.firstName
      ? {
          ...profile.curator,
          value: profile.curator?.id,
          label: `${profile?.curator?.firstName} ${profile?.curator?.lastName}`,
        }
      : null
  );

  const isCurator = userProfile?.roleType === "Curator";

  const access =
    userProfile?.roleType === "Administrator" ||
    userProfile?.roleType === "Strategist";

  return (
    <Block id={"block-education"} isEditable={false}>
      <Header
        isEditable={access ? editingBlockId != null : true}
        isEmpty={!!!curator}
        edit={handleEdit}
      />
      {access ? (
        isEditing ? (
          <FormCurator
            curator={curator}
            id={profile.id}
            setData={setCurator}
            cancel={handleCancel}
          />
        ) : (
          curator && <Body curator={curator} />
        )
      ) : (
        curator && <Body curator={curator} isCurator={isCurator} />
      )}
    </Block>
  );
};
