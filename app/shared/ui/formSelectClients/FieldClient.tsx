import { Select } from "@/app/shared/ui/antd/select/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Avatar, Spin } from "antd";
import { Field, Label } from "./ui";
import { useInfiniteQueryRequestClients } from "../../hooks/useQueryGetClientList";

interface Props {
  form: any;
  name: string;
  label: string;
  placeholder: string;
}
export function FieldClient({ form, name, label, placeholder }: Props) {
  const { t } = useTranslation();
  //const clientList = useQueryGetClientList();
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQueryRequestClients({
    itemsPerPage: 20,
  });

  const handleScroll = (event: any) => {
    const { target } = event;
    if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
      fetchNextPage();
    }
  };

  //const [searchValue, setSearchValue] = useState("");

  //const handleSearch = (value: string) => {
  //  console.log("value", value);
  //  setSearchValue(searchValue + value);
  //};
  //showSearch
  //onSearch={handleSearch}

  return (
    <Field>
      <Label>{t(label)}</Label>
      <Controller
        name={name}
        {...form.register}
        render={({ field }) => (
          <Select
            onPopupScroll={handleScroll}
            value={field.value}
            size="large"
            className="borderedSelect"
            placeholder={t(placeholder)}
            optionRender={(item) => (
              <div
                className="flex flex-row gap-2 items-center"
                onClick={() => field.onChange(item.value)}
              >
                <Avatar size={24} src={item.data.imageUrl} />
                <p>{item.label}</p>
                {/*<span ref={ref} />*/}
              </div>
            )}
            labelRender={(item) => {
              //const currentCurator = clientList.data.find(
              const currentCurator = data?.find(
                (cur: { value: number; label: string }) =>
                  cur.label === item.label
              );
              return (
                <div className="flex flex-row gap-2 items-center">
                  <Avatar size={24} src={currentCurator?.imageUrl} />
                  <p>{item.label}</p>
                </div>
              );
            }}
            dropdownRender={(menu) => (
              <>
                {menu}
                {isFetching && (
                  <div style={{ textAlign: "center", padding: "8px" }}>
                    <Spin size="small" />
                  </div>
                )}
              </>
            )}
            loading={isLoading}
            options={data}
            disabled={isLoading}
            //loading={clientList.isLoading}
            //options={clientList.data}
            //disabled={clientList.isLoading}
            optionFilterProp="label"
          />
        )}
      />
    </Field>
  );
}
