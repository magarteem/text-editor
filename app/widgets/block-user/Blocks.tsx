import { PropsWithChildren, ReactNode, useState } from "react";
import CopyIcon from "@/public/svg/copy-mail.svg";
import { GetProfileResponse } from "@/app/shared";
import { useTypeOfDegree } from "../block-application-details/hooks";
import { TopTag } from "../block-chosen-universities/ui";

interface InfoBlockProps {
  icon: ReactNode;
}
export const InfoBlock = ({
  children,
  icon,
}: PropsWithChildren<InfoBlockProps>) => {
  return (
    <div className={"flex gap-2 items-center text-sm text-ellipsis px-1"}>
      <div>{icon}</div>
      <div
        className="text-ellipsis max-w-52 overflow-hidden"
        title={children as string}
      >
        {children}
      </div>
    </div>
  );
};

interface MailToProps extends InfoBlockProps {
  mail: string;
}
export const MailToBlock = ({
  children,
  icon,
  mail,
}: PropsWithChildren<MailToProps>) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(mail);
  };

  return (
    <div
      onClick={handleCopy}
      className={
        "flex gap-2 items-center text-sm cursor-pointer hover:bg-hover-white rounded-lg text-blue-highlight group px-1"
      }
    >
      <div>{icon}</div>
      <div className="max-w-56 overflow-hidden text-ellipsis whitespace-nowrap">
        <a title={children as string}>{children}</a>
      </div>
      <div className="hidden group-hover:block ml-auto">
        <CopyIcon />
      </div>
    </div>
  );
};

interface TelegramProps extends InfoBlockProps {
  telegramId: string;
}
export const TelegramBlock = ({
  children,
  icon,
  telegramId,
}: PropsWithChildren<TelegramProps>) => {
  return (
    <div className={"flex gap-2 items-center text-sm px-1"}>
      <div>{icon}</div>
      <div className="max-w-56 overflow-hidden text-ellipsis whitespace-nowrap">
        <a
          href={`tg://resolve?domain=${telegramId}`}
          title={children as string}
        >
          {children}
        </a>
      </div>
    </div>
  );
};

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(remainingMinutes).padStart(2, "0");
  return `${formattedHours}ч${formattedMinutes}м`;
}

export const TimeBlock = ({
  minutesSpent,
  minutesPlanned,
  icon,
}: {
  minutesPlanned?: number;
  minutesSpent?: number;
  icon: ReactNode;
}) => {
  return (
    <div>
      <div className="w-full h-[1px] bg-gray opacity-20 mt-2"></div>
      <div className="flex flex-row gap-2 items-center mt-4">
        <div>{icon}</div>
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          {minutesSpent ? formatMinutes(minutesSpent) : "00ч00м"}&nbsp;/&nbsp;
          {minutesPlanned ? formatMinutes(minutesPlanned) : "00ч00м"}
        </span>
      </div>
    </div>
  );
};

interface DetailsProgramBlockProps {
  profile: GetProfileResponse;
}

export const DetailsProgramBlock: React.FC<DetailsProgramBlockProps> = ({
  profile,
}) => {
  return (
    <div className="text-xs py-1 px-2 bg-gray-bright rounded-lg max-w-56 overflow-hidden whitespace-nowrap inline-flex items-center">
      <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
        {profile.targetDetailsProgram}
      </p>
    </div>
  );
};

interface GradeBlockProps {
  profile: GetProfileResponse;
}

export const GradeBlock: React.FC<GradeBlockProps> = ({ profile }) => {
  const degree = useTypeOfDegree(
    profile.targetDetailsPersonDegree || "Bachelor"
  );
  return (
    <div className="text-xs py-1 px-2 bg-gray-bright rounded-lg max-w-56 overflow-hidden text-ellipsis whitespace-nowrap inline-flex items-center">
      {degree}
    </div>
  );
};

interface YearOfEnrollmentBlockProps {
  profile: GetProfileResponse;
}

export const YearOfEnrollmentBlock: React.FC<YearOfEnrollmentBlockProps> = ({
  profile,
}) => {
  return (
    <div className="text-xs py-1 px-2 bg-gray-bright rounded-lg max-w-56 overflow-hidden text-ellipsis whitespace-nowrap inline-flex items-center">
      {profile.targetDetailsYear}
    </div>
  );
};

interface UniversitiesListBlockProps {
  profile: GetProfileResponse;
}

export const UniversitiesListBlock: React.FC<UniversitiesListBlockProps> = ({
  profile,
}) => {
  return (
    <ul className="flex flex-col gap-1.5">
      {profile.targetDetailsUniversity.map((university) => (
        <li
          key={university.university}
          className="text-sm rounded-lg max-w-56 overflow-hidden text-ellipsis whitespace-nowrap flex flex-row gap-2 items-center justify-between"
        >
          <p className="max-w-40 overflow-hidden text-ellipsis">
            {university.university}
          </p>
          {university.top && <TopTag />}
        </li>
      ))}
    </ul>
  );
};

interface TargetCountriesBlockProps {
  profile: GetProfileResponse;
}

export const TargetCountriesBlock: React.FC<TargetCountriesBlockProps> = ({
  profile,
}) => {
  const countriesString = profile.targetDetailsCountryForAdmission
    .map((country) => country.country)
    .join(", ");
  return (
    <div className="text-xs py-1 px-2 bg-gray-bright rounded-lg max-w-56 overflow-hidden text-ellipsis whitespace-nowrap inline-flex items-center">
      <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
        {countriesString}
      </p>
    </div>
  );
};
