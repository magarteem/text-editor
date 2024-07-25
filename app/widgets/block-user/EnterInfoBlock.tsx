import { GetProfileResponse } from "@/app/shared/api/request/getProfile";

interface Props {
  profile: GetProfileResponse;
}
export const EnterInfoBlock = ({ profile }: Props) => {
  const showLabel = !(
    profile.birthday ||
    profile.cityOfResidence ||
    profile.countryOfResidence ||
    profile.citizenship
  );

  if (!showLabel) {
    return null;
  }

  return (
    <div className={"text-sm text-grey-light px-6"}>Внесите информацию</div>
  );
};
