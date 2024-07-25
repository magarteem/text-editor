import { Block } from "@/app/features/block/Block";
import { DocumentQA } from "./fields/DocumentQA";
import { DocumentContent } from "./fields/DocumentContent";
import { BlockClientComment } from "../block-client-comment";
import { DocumentAuthor } from "./fields/DocumentAuthor";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import { useStore } from "zustand";
import { useState } from "react";
import { HeaderDocument } from "./ui/HeaderDocument";
import { FormEditDocument } from "./FormEditDocument";
import { useParams } from "next/navigation";
import { useQueryGetStorageFileId } from "@/app/shared/hooks/useQueryStorageMethods";

export const BlockClientDocument = () => {
  const { filesId }: { filesId: string } = useParams();
  const profile = useStore(useProfileStore);
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useQueryGetStorageFileId(filesId);
  const handleEdit = () => setIsEditing((prev) => !prev);

  if (!data) return;
  if (!profile) return;

  return (
    <section className="flex flex-col gap-6 pb-6">
      <Block isEditable={false} classNames="px-0">
        <HeaderDocument
          handleEdit={handleEdit}
          isEditing={isEditing}
          myProfileId={profile.id}
          authorDocumentId={data.author.id}
          link={data.link}
        />

        {isEditing ? (
          <FormEditDocument
            defaultData={data}
            handleEdit={handleEdit}
            filesId={filesId}
            role={profile.roleType}
          />
        ) : (
          <>
            <DocumentContent {...data} />
            <DocumentQA {...data} />
            <DocumentAuthor {...data} />
          </>
        )}
      </Block>

      {profile.roleType && profile.roleType !== "Client" && (
        <BlockClientComment
          stageId={filesId}
          queryKey="documentPage"
          apiUrlComments="/api/comment-storage-file"
        />
      )}
    </section>
  );
};
