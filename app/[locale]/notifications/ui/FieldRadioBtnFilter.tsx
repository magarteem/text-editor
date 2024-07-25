import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { menu, MenuElementType } from "../helpers/menuItems";
import cn from "classnames";
import { TypeNotification } from "@/app/shared";

interface Props {
  form: any;
  x: MenuElementType;
  counts: number | undefined;
  changeTopFilter: (obj: {
    page: number;
    typeNotification?: TypeNotification;
  }) => void;
}

export const FieldRadioBtnFilter = ({
  form,
  x,
  counts,
  changeTopFilter,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={x.id}
      control={form.control}
      render={({ field: { name, value, onChange, ...field } }) => (
        <CustomInput key={x.name}>
          <input
            className="hidden"
            type="radio"
            value={value}
            id={x.id}
            checked={value}
            name="radiomenu"
            onChange={(e) => {
              const temp: { [key: string]: boolean | undefined } = {};
              menu.forEach((elem) => {
                if (elem.id === x.id) {
                  changeTopFilter({
                    page: 1,
                    typeNotification:
                      elem.id !== "System" ? elem.id : undefined,
                  });
                  onChange(e.target.checked);
                  temp[elem.id] = e.target.checked ? true : undefined;
                } else {
                  form.setValue(elem.id, false);
                  temp[elem.id] = undefined;
                }
              });

              //changeTopFilter({ page: 1, ...temp });
            }}
            {...field}
          />
          <label
            htmlFor={x.id}
            className={cn(
              "flex items-center font-bold	 gap-2 text-sm text-gray px-2 py-2 cursor-pointer"
            )}
          >
            {x?.icon}
            <span className="spanelem">{t(x.name)}</span>
            {counts && (
              <span className="text-xs font-extrabold	 px-2 py-1 text-blue-highlight bg-blue-bright-highlight rounded-lg">
                {counts}
              </span>
            )}
          </label>
        </CustomInput>
      )}
    />
  );
};

const CustomInput = styled.div`
  input[type="radio"]:checked + label {
    background-color: #ecf7ff;
    border-radius: 12px;
  }
  input[type="radio"]:checked + label .spanelem {
    color: #262a39;
  }
  input[type="radio"]:checked + label .text-xs {
    color: #214080;
  }
`;
