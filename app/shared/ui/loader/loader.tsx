import { Spin } from "antd";
import Icon from "@ant-design/icons";
import LoadingSpinIcon from "@/public/svg/loading-spin-icon.svg";

export function Loader() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spin
        spinning={true}
        size="large"
        indicator={
          <Icon component={LoadingSpinIcon} style={{ fontSize: 96 }} spin />
        }
      />
    </div>
  );
}
