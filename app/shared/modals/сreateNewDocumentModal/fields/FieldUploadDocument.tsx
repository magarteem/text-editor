import { Controller } from "react-hook-form";
import { Field } from "@/app/widgets";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "@/lib/theme/const/colors";
import { Progress, Upload, UploadFile } from "antd";
import { useState } from "react";
import IconDone from "@/public/svg/green.svg";
import RedCross from "@/public/svg/red-cross-big.svg";

const { Dragger } = Upload;

const validFormats = [
  ".zip",
  ".rar",
  ".7z",
  ".exe",
  ".apk",
  ".md5",
  ".mdf",
  ".dmg",
];

interface Props {
  form: any;
  progress: any;
  uploading: any;
  removeFile: () => void;
}

export function FieldUploadDocument({
  form,
  progress,
  uploading,
  removeFile,
}: Props) {
  const { t } = useTranslation();
  const [defaultFileList, setDefaultFileList] = useState<UploadFile[]>([]);

  const onRemove = () => {
    removeFile();
    setDefaultFileList([]);
    form.setValue("docFile", undefined);
    form.clearErrors("docFile");
    return false;
  };

  const typeFormatFile = (name: string) => {
    const lastIndex = name.lastIndexOf(".");
    const formatFile = name.slice(lastIndex);

    return validFormats.includes(formatFile);
  };

  return (
    <Field>
      <Controller
        name="docFile"
        control={form.control}
        render={(field) => (
          <>
            <CustomUploadDragger
              showUploadList={{
                showRemoveIcon: true,
                removeIcon: (
                  <span
                    className="flex items-center h-full"
                    onClick={() => onRemove()}
                  >
                    {progress === 100 && !field.fieldState.error ? (
                      <IconDone />
                    ) : (
                      <RedCross />
                    )}
                  </span>
                ),
              }}
              isUploaded={!!defaultFileList.length}
              onRemove={onRemove}
              fileList={defaultFileList}
              beforeUpload={(file) => {
                form.clearErrors("docFile");
                if (typeFormatFile(file.name)) {
                  form.setError("docFile", {
                    message: t("storage.formText.notSupportedFileFormat"),
                  });
                  return;
                }

                setDefaultFileList([file]);
                form.setValue("docFile", file);
                return false;
              }}
              {...field}
            >
              <span className="text-gray text-sm	font-medium">
                {t("storage.formText.placeholderUploadDoc").split("^")[0]}&nbsp;
                <span className="text-blue-highlight">
                  {t("storage.formText.placeholderUploadDoc").split("^")[1]}
                </span>
                .
              </span>

              <p className="text-gray text-sm font-medium">
                {t("storage.formText.сannotSendFormats")}
                <span className="font-semibold pl-2">
                  .zip .rar .7z .exe .apk .md5 .mdf .dmg
                </span>
              </p>
            </CustomUploadDragger>

            {uploading &&
              !field.fieldState.error &&
              !!defaultFileList.length && (
                <div className="text-gray text-sm">
                  <StyledProgress
                    status={field.fieldState.error && "exception"}
                    percent={progress}
                  />
                  <span>
                    {defaultFileList[0]?.size &&
                      Math.floor(
                        ((progress / 100) * defaultFileList[0].size) / 1024
                      )}
                    KB
                    <span className="pl-4">
                      {t("storage.formText.uploadProcessing")}
                    </span>
                  </span>
                </div>
              )}

            {field.fieldState.error?.message && (
              <div className="text-red-saturated text-sm">
                {!field.fieldState.error && (
                  <StyledProgress
                    //format={(e) => null}
                    percent={progress}
                    status={field.fieldState.error && "exception"}
                  />
                )}

                <span>{t(field.fieldState.error.message)}</span>
              </div>
            )}
          </>
        )}
      />
    </Field>
  );
}

const CustomUploadDragger = styled(Dragger)<{ isUploaded: boolean }>`
  min-height: 100% !important;
  width: 100% !important;

  .ant-upload-list-item,
  .ant-upload-list-item-action {
    opacity: 1 !important;
    background-color: inherit !important;
  }
  .ant-upload-list-item-actions {
    height: 22px !important;
  }

  .ant-upload-icon {
    display: none;
  }
  .ant-upload {
    border-radius: ${({ theme }) => theme.radius.xxl} !important;
    min-height: 76px !important;
    display: ${({ isUploaded }) =>
      isUploaded ? "none !important" : "block !important"};
  }
  .ant-upload-btn {
    display: flex !important;
    align-items: center !important;
  }
  .ant-upload-drag-container {
    text-align: left;
  }
  .ant-upload-list-item-container {
    width: 100%;
    height: auto;
  }

  .ant-upload-list-item {
    padding: 0 !important;
    width: 100% !important;
    border-radius: 16px !important;

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

    &:hover {
      background-color: ${colors.blueBright} !important;
    }
  }
`;

const StyledProgress = styled(Progress)`
  .ant-progress-inner {
    height: 4px !important;
  }
`;
