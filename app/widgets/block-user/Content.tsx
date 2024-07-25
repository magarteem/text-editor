import { format } from "date-fns";
import { GetProfileResponse } from "@api/index";
import { TypeOfServiceTag, TypeOfClientTag } from "@ui/index";
import { icons } from "@const/index";
import { Title } from "@widgets/index";
import {
  DetailsProgramBlock,
  GradeBlock,
  InfoBlock,
  MailToBlock,
  TargetCountriesBlock,
  TelegramBlock,
  TimeBlock,
  UniversitiesListBlock,
  YearOfEnrollmentBlock,
} from "./Blocks";
import { EnterInfoBlock } from "./EnterInfoBlock";
import BigPenIcon from "@/public/svg/big-pen.svg";
import { Divider } from "antd";

interface Props {
  profile: GetProfileResponse;
  isEditable: boolean;
  edit?(): void;
  blockId?: string | null;
  isClient?: boolean;
  currTab?: string;
}

const Header: React.FC<Props> = ({
  profile,
  edit,
  isEditable,
  blockId,
  currTab,
}) => (
  <div className="flex justify-between">
    <Title profile={profile} />
    {blockId == null && currTab !== "progress" && currTab !== "storage" && (
      <button onClick={edit} className="w-5 h-5">
        <BigPenIcon />
      </button>
    )}
  </div>
);

export const Content: React.FC<Props> = ({
  profile,
  edit,
  isEditable,
  blockId,
  isClient,
  currTab,
}) => {
  const showBasicInfo =
    currTab && currTab !== "progress" && currTab !== "storage";

  return (
    <div className="flex flex-col gap-4">
      <Header
        currTab={currTab}
        isEditable={isEditable}
        profile={profile}
        edit={edit}
        blockId={blockId}
      />

      {!isClient && (
        <div className="flex gap-2 items-center">
          <TypeOfServiceTag type={profile.targetDetailsTypeOfService} />
          <TypeOfClientTag type={profile.internalInfoCandidateClassification} />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        {showBasicInfo && profile.birthday !== 0 && profile.birthday && (
          <InfoBlock icon={icons.calendar({ className: "w-4 h-4" })}>
            {format(new Date(profile.birthday), "dd.MM.yyyy")}
          </InfoBlock>
        )}
        {showBasicInfo &&
          profile.cityOfResidence &&
          profile.countryOfResidence.country && (
            <InfoBlock
              icon={icons.mapPin({ className: "w-4 h-4", stroke: "#626C76" })}
            >
              {profile.cityOfResidence}, {profile.countryOfResidence.country}
            </InfoBlock>
          )}
        {showBasicInfo && profile.citizenship.country && (
          <InfoBlock
            icon={icons.identification({
              className: "w-4 h-4",
              stroke: "#626C76",
            })}
          >
            {profile.citizenship.country}
          </InfoBlock>
        )}
        {profile.telegramId && (
          <TelegramBlock
            icon={icons.telegram({ className: "w-4 h-4" })}
            telegramId={profile.telegramId}
          >
            {profile.telegramId}
          </TelegramBlock>
        )}
        {profile.emailAddress && (
          <MailToBlock
            icon={icons.mail({ className: "w-4 h-4", stroke: "#626C76" })}
            mail={profile.emailAddress}
          >
            {profile.emailAddress}
          </MailToBlock>
        )}
        {(currTab === "progress" || currTab === "storage") && (
          <ProgressInfo profile={profile} currTab={currTab} />
        )}

        {currTab !== "storage" &&
          ((profile?.durationOfCallsSpent ?? 0) > 0 ||
            (profile?.durationOfCallsPlanned ?? 0) > 0) && (
            <TimeBlock
              icon={icons.phone({ className: "w-4 h-4" })}
              minutesSpent={profile?.durationOfCallsSpent ?? 0}
              minutesPlanned={profile?.durationOfCallsPlanned ?? 0}
            />
          )}
      </div>
      {!profile.birthday &&
        !profile.cityOfResidence &&
        !profile.countryOfResidence.country &&
        !profile.citizenship.country && (
          <>
            <div className="w-full h-[1px] bg-gray opacity-20 mt-1" />
            <p className="flex pl-4 text-xs text-gray">Внесите информацию</p>
          </>
        )}

      <EnterInfoBlock profile={profile} />
    </div>
  );
};

const ProgressInfo: React.FC<{
  profile: GetProfileResponse;
  currTab?: string;
}> = ({ profile, currTab }) => {
  const hasTargetCountries =
    profile.targetDetailsCountryForAdmission &&
    profile.targetDetailsCountryForAdmission.length >= 1;
  const hasPersonDegree = !!profile.targetDetailsPersonDegree;
  const hasYear = !!profile.targetDetailsYear;
  const hasProgram = !!profile.targetDetailsProgram;
  const hasUniversities =
    profile.targetDetailsUniversity &&
    profile.targetDetailsUniversity.length >= 1;

  const hasAnyInfo =
    hasTargetCountries ||
    hasPersonDegree ||
    hasYear ||
    hasProgram ||
    hasUniversities;

  if (!hasAnyInfo) {
    return null;
  }

  return (
    <div>
      {currTab !== "storage" && (
        <div className="w-full h-[1px] bg-gray opacity-20 mt-4" />
      )}
      <div className="mt-4 gap-4 flex flex-col">
        <div className="flex flex-row flex-wrap gap-2">
          {hasTargetCountries && <TargetCountriesBlock profile={profile} />}
          {hasPersonDegree && <GradeBlock profile={profile} />}
          {hasYear && <YearOfEnrollmentBlock profile={profile} />}
          {hasProgram && <DetailsProgramBlock profile={profile} />}
        </div>
        {currTab !== "storage" && hasUniversities && (
          <UniversitiesListBlock profile={profile} />
        )}
      </div>
    </div>
  );
};
