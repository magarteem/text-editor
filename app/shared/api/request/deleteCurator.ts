import { getCookie } from "@api/index";
import axios from "axios";


export const deleteCurator = async (data: {clientId: number, employeeId: number}) => {
  try {
    const response = await axios.delete(`/api/client/assign-employee?clientId=${data.clientId}&employeeId=${data.employeeId}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

