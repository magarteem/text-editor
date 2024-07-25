"use client";

import { Button } from "@ui/index";
import { Flex } from "antd";
import { useLanguage } from "@hooks/index";

export const ChangeLanguageBtns = () => {
  const { onChangeLanguage } = useLanguage();
  return (
    <Flex>
      <Button onClick={() => onChangeLanguage("en")}>EN</Button>
    </Flex>
  );
};
