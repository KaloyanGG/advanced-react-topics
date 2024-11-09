import { axiosInstance } from "../config";

export const fetchIngredients = async () => {
  const { data } = await axiosInstance.get<string[]>("/ingredients");
  return data;
};
