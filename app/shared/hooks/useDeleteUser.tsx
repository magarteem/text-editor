import { getCookie } from "../api";
import axios from "axios";

export function useDeleteUser() {
  const deleteUser = async ({ id }: { id: number }) => {
    try {
      await axios.delete(`/api/user/?userId=${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
      });
      const row = document.querySelectorAll(`[data-row-key="${id}"]`);
      row[0].classList.add("disabled-row");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteUser,
  };
}
