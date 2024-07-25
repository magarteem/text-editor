import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { MenuElementType } from "../helpers/menuItems";
import cn from "classnames";

interface Props {
  form: any;
  x: MenuElementType;
  counts: number | undefined;
  changeTopFilter: (obj: {
    page: number;
    [key: string]: boolean | number | undefined;
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
            type="checkbox"
            value={value}
            id={x.id}
            checked={value}
            name="radiomenu"
            onChange={(e) => {
              const menu = [
                "isNew",
                "inProgressMe",
                "inProgressOthers",
                "isArchive",
              ];
              const temp: { [key: string]: boolean | undefined } = {};
              menu.forEach((elem) => {
                if (elem === x.id) {
                  onChange(e.target.checked);
                  temp[elem] = e.target.checked ? true : undefined;
                } else {
                  if (elem === "inProgressOthers") {
                    form.setValue("strategistId", null);
                  }
                  form.setValue(elem, false);
                  temp[elem] = undefined;
                }
              });

              changeTopFilter({ page: 1, ...temp });
            }}
            {...field}
          />
          <label
            htmlFor={x.id}
            className={cn(
              "flex items-center fon gap-2 text-sm text-gray font-semibold px-2 py-2 cursor-pointer"
            )}
          >
            <span className="spanelem">{t(x.name)}</span>
            {counts && (
              <span
                className={cn(
                  "text-xs font-extrabold	 px-2 py-1 text-blue-highlight bg-blue-bright-highlight rounded-lg"
                )}
              >
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
  input[type="checkbox"]:checked + label {
    background-color: #ecf7ff;
    border-radius: 12px;
  }
  input[type="checkbox"]:checked + label .spanelem {
    color: #262a39;
  }
  input[type="checkbox"]:checked + label .text-xs {
    color: #214080;
  }
`;
