import { create } from "zustand";
import { GetProfileResponse } from "@api/index";

export const useProfileStore = create<GetProfileResponse | null>(() => null);
