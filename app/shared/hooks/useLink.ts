import { useLanguage } from "@hooks/useLanguage";

interface Props {
  href?: string;
}
export const useLink = ({ href }: Props) => {
  const { lang } = useLanguage();

  return href ? "/" + lang + href : "";
};
