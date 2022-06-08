import { useQueryWithAuth } from "../../hooks/auth";
import { GET_CATEGORIES } from "../queries/categories";


export const useQueryCategories = () => {
  const { data, loading, error, refetch } = useQueryWithAuth(GET_CATEGORIES);
  return { data, loading, error, refetch };
};
