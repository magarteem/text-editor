import { GetProp, UploadProps } from "antd";

export type AntdFileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const antdGetBase64 = (file: AntdFileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
