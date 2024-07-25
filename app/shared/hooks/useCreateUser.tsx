import { useRef } from "react";
import { getCookie } from "../api";
import axios from "axios";
import { EmailAddress } from "@clerk/nextjs/server";

interface ICreateUser {
  emailAddress: string;
  firstName: string;
  lastName: string;
}

export function useCreateUser() {
  const loading = useRef(false);
  const createUser = async ({
    emailAddress,
    firstName,
    lastName,
  }: ICreateUser) => {
    try {
      loading.current = true;
      const response = await axios.post(
        `/api/user/`,
        {
          emailAddress,
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );
      loading.current = false;
      return response.data;
    } catch (error: any) {
      loading.current = false;
      return error.code;
    }
  };

  return {
    createUser,
    loading,
  };
}
