"use client";
import { Image, Upload, UploadFile } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { UploadChangeParam } from "antd/es/upload";
import { AntdFileType, antdGetBase64 } from "@/app/shared/helpers/base64";
import { Label } from "@widgets/index";
import { Field } from "../Field";
import { colors } from "@/lib/theme/const/colors";
import { useTranslation } from "react-i18next";
import { Avatar } from "@ui/index";
import { useController } from "react-hook-form";
import { FormState } from "@widgets/index";

export const PhotoField = ({
  base64,
  setBase64,
}: {
  base64?: string;
  setBase64?: any;
}) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const controller = useController<FormState>({
    name: "imageUrl",
  });

  const controllerAvatar = useController<FormState>({
    name: "avatar",
  });

  const onChange = async ({ file }: UploadChangeParam) => {
    const validFormats = [".jpg", ".jpeg", ".png", ".img"];
    const maxSize = 3 * 1024 * 1024;
    const base64 = await antdGetBase64(file.originFileObj as AntdFileType);
    const fileExt = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!validFormats.includes(fileExt)) {
      alert(t("clients.userForm.uploadFormatError"));
      return;
    }

    if ((file?.size as number) > maxSize) {
      alert(t("clients.userForm.uploadValueError"));
      return;
    }

    setPreviewImage(controller.field.value as string);
    setFileList([file]);
    setBase64 && setBase64(base64);
    controllerAvatar.field.onChange(base64);
  };

  const onRemove = () => {
    setFileList([]);
    setPreviewImage("");
    setBase64 && setBase64("");
    return false;
  };

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await antdGetBase64(file.originFileObj as AntdFileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <Field>
      <Label htmlFor={"avatar"}>{t("clients.userForm.photo")}</Label>
      <div className="flex flex-row items-center gap-3">
        <Avatar imageUrl={controller.field.value as string} />
        <CustomUpload
          listType={"picture-card"}
          maxCount={1}
          fileList={fileList}
          isUploaded={!!fileList.length}
          onChange={onChange}
          onRemove={onRemove}
          onPreview={onPreview}
        >
          <span style={{ fontSize: "10px" }} className="text-gray">
            Вставте изображение или
            <br />
            <span className="flex flex-row gap-0.5">
              нажмите, чтоб <p className="text-blue-highlight">загрузить</p>.
            </span>
          </span>
        </CustomUpload>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible: boolean) => setPreviewOpen(visible),
            afterOpenChange: (visible: boolean) =>
              !visible && setPreviewImage(""),
          }}
          src={previewImage}
          alt={"Avatar"}
        />
      )}
    </Field>
  );
};

const CustomUpload = styled(Upload)<{ isUploaded: boolean }>`
  height: 56px !important;
  max-width: 158px !important;

  .ant-upload-list-item-container {
    width: auto;
    height: auto;
  }

  .ant-upload-list-item {
    padding: 0 !important;
    width: 56px !important;
    height: 56px !important;
    border-radius: 16px !important;

    img {
      border-radius: 16px !important;
    }

    &:before {
      width: 100% !important;
      height: 100% !important;
      border-radius: 16px !important;
    }
  }
  .ant-upload-select {
    width: 100% !important;
    display: ${({ isUploaded }) => (isUploaded ? "none" : "block")};
    background-color: ${colors.blueBright} !important;
    border-radius: ${({ theme }) => theme.radius.xxl} !important;
    height: 56px !important;

    &:hover {
      background-color: ${colors.blueBright} !important;
    }
  }
`;
