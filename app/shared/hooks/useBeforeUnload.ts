import { useEffect } from "react";
import { useBlockStore } from "@/app/features/block/store/useBlockStore";

export const useBeforeUnload = () => {
  const editableBlock = useBlockStore((state) => state.editableId);

  useEffect(() => {
    window.onbeforeunload = editableBlock
      ? function () {
          return "Data will be lost if you leave the page, are you sure?";
        }
      : null;

    return () => {
      window.onbeforeunload = null;
    };
  }, [editableBlock]);
};
