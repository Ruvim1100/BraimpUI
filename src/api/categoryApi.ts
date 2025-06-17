import type { AxiosInstance } from "axios";
import type { Category } from "../models/categories/category";
import type { CategoryListResponse } from "../models/categories/categoryListResponse";

export const getCategories = async (
  axios: AxiosInstance
): Promise<Category[]> => {
  const response = await axios.get<CategoryListResponse>("/categories");
  return response.data.categories;
};

export const getCategoryById = async (
  axios: AxiosInstance,
  id: string
): Promise<Category> => {
  const response = await axios.get<Category>(`/categories/${id}`);
  return response.data;
};
