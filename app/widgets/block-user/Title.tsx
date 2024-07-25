import Image from "next/image";
import { GetProfileResponse } from "@api/index";
import { Avatar } from "@ui/index";

interface Props {
  profile: GetProfileResponse;
}
export const Title = ({ profile }: Props) => {
  return (
    <div className={"flex gap-4 items-center font-bold text-gray"}>
      <Avatar imageUrl={profile.imageUrl} />
      <div
        className="max-w-28 overflow-hidden text-ellipsis"
        title={profile.firstName + " " + profile.lastName}
      >
        {profile.firstName + " " + profile.lastName}
      </div>
    </div>
  );
};
