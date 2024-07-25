import { getCookie } from "@api/index";
import axios from "axios";


export const assignCurator = async (data: {clientId: number, employeeId: number}) => {
  try {
    const response = await axios.post(`/api/client/assign-employee`, data, {
      params: { clientId: data.clientId, employeeId: data.employeeId},
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

