import LogoSmallImage from "@/public/svg/logo-small.svg";
import LogoSmallTextImage from "@/public/svg/logo-small-text.svg";

export const MenuLogo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={"flex items-center"}>
      <div className="whitespace-nowrap flex flex-row items-center gap-2">
        <LogoSmallImage />
        {!collapsed && <LogoSmallTextImage />}
      </div>
    </div>
  );
};
