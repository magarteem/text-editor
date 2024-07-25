"use client";
import {
  Footer,
  FirstNameField,
  LastNameField,
  CountryOfResidenceField,
  CityOfResidenceField,
  InternalInfoCandidateClassificationField,
  DurationOfCallsSpentField,
  DurationOfCallsPlannedField,
  EmailField,
} from "@widgets/index";
import { FormProvider, useForm } from "react-hook-form";
import { PhotoField } from "./fields/PhotoField";
import { FormState } from "./types";
import { GetProfileResponse, uploadFile } from "@api/index";
import { BirthdayField } from "./fields/BirthdayField";
import { CitizenshipField } from "./fields/CitizenshipField";
import { TelegramField } from "./fields/TelegramField";
import { useEffect, useState } from "react";
import { useGetCountriesList } from "@/app/shared/hooks/useGetCountriesList";
import { patchProfile } from "@api/index";
import { useStore } from "zustand";
import { useProfileStore } from "@store/index";

interface Props {
  profile: GetProfileResponse;
  cancel(): void;
  setProfile: any;
  isClient?: boolean;
}

export const UserForm = ({ cancel, profile, setProfile, isClient }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [base64, setBase64] = useState();
  const userProfile = useStore(useProfileStore);

  const form = useForm<any>({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      birthday: profile?.birthday,
      imageUrl: profile?.imageUrl,
      countryOfResidence: profile?.countryOfResidence?.id || null,
      cityOfResidence: profile?.cityOfResidence || "",
      citizenship: profile?.citizenship?.id || null,
      telegramId: profile?.telegramId || "",
      emailAddress: profile?.emailAddress || "",
      internalInfoCandidateClassification:
        profile?.internalInfoCandidateClassification || "",
      durationOfCallsPlanned: profile?.durationOfCallsPlanned || 0,
      durationOfCallsSpent: profile?.durationOfCallsSpent || 0,
      avatar: "",
    },
  });

  const { fetchRecords, dataSource, loading } = useGetCountriesList({
    forAdmission: false,
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const onSubmit = async (data: FormState) => {
    if (form.formState.isDirty) {
      setIsSubmitting(true);
      const changedFields: any = {
        id: profile.id,
        ...data,
      };

      changedFields.citizenshipId = data.citizenship;
      changedFields.countryOfResidenceId = data.countryOfResidence;

      delete changedFields.targetDetailsStartDate;
      delete changedFields.targetDetailsEndDate;
      delete changedFields.citizenship;
      delete changedFields.countryOfResidence;

      try {
        const response = await patchProfile(changedFields);
        setProfile(response);
      } catch (err) {
        setIsSubmitting(false);
        cancel();
      } finally {
        setIsSubmitting(false);
        cancel();
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={"flex flex-col gap-4"}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <PhotoField base64={base64} setBase64={setBase64} />
        <FirstNameField isOnlyView={isClient} />
        <LastNameField isOnlyView={isClient} />
        <BirthdayField reset={form.resetField} />
        <CountryOfResidenceField countries={dataSource} />
        <CityOfResidenceField />
        <CitizenshipField countries={dataSource} />
        {userProfile?.roleType === "Administrator" && <TelegramField />}
        <EmailField
          isEditable={userProfile?.roleType === "Administrator"}
          form={form}
        />
        {!isClient && <InternalInfoCandidateClassificationField />}
        <DurationOfCallsPlannedField isOnlyView={isClient} />
        <DurationOfCallsSpentField isOnlyView={isClient} />
        <Footer onEdit={cancel} isSubmitting={isSubmitting} form={form} />
      </form>
    </FormProvider>
  );
};
