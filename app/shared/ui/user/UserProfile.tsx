import cn from "classnames";
import { Avatar as AvatarAnt } from "antd";
import { Label } from "@/app/widgets";

interface Props {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  title?: string;
}
export const UserProfile = ({
  title,
  firstName,
  lastName,
  imageUrl,
}: Props) => {
  return (
    <div className={"flex flex-col gap-2"}>
      {!!title && <Label>{title}</Label>}
      <div
        className={cn({
          "w-fit flex gap-2 items-center font-bold text-gray cursor-pointer":
            true,
        })}
      >
        <AvatarAnt src={imageUrl} size={32} style={{ background: "#FADDE8" }}>
          {!imageUrl && (
            <p className="text-xs text-raspberries font-semibold">
              {firstName?.split(" ").join("")[0] +
                lastName?.split(" ").join("")[0]}
            </p>
          )}
        </AvatarAnt>

        <div className={"text-sm text-black-not-so whitespace-nowrap "}>
          {firstName} {lastName}
        </div>
      </div>
    </div>
  );
};
