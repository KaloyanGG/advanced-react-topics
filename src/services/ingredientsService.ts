import { axiosInstance } from "../config/config";
export type Ingredient = {
  name: string;
  _id: string;
};
export const fetchIngredients = async () => {
  const { data } = await axiosInstance.get<Ingredient[]>("/ingredients");
  return data;
};
